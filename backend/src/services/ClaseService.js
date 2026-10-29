'use strict';

const mongoose = require('mongoose');
const { AppError } = require('../utils/AppError');
const { toClaseView } = require('../serializers/clase.serializer');
const { Reserva, Usuario } = require('../models');

class ClaseService {
  constructor(repos) {
    this.clases = repos.clases;
    this.reservas = repos.reservas;
  }

  async list() {
    const clases = await this.clases.find({}).lean();
    const out = [];
    for (const c of clases) {
      const profesor = c.profesor_id ? await Usuario.findById(c.profesor_id).lean() : null;
      const inscritos = await Reserva.countDocuments({ clase_id: c._id, tipo: 'clase', estado: { $in: ['pendiente', 'confirmada'] } });
      out.push(toClaseView(c, profesor, inscritos));
    }
    return out;
  }

  async getById(id) {
    const c = await this.clases.findById(id).lean();
    if (!c) throw new AppError('Clase no encontrada', 404);
    const profesor = c.profesor_id ? await Usuario.findById(c.profesor_id).lean() : null;
    const inscritos = await Reserva.countDocuments({ clase_id: c._id, tipo: 'clase', estado: { $in: ['pendiente', 'confirmada'] } });
    return toClaseView(c, profesor, inscritos);
  }

  async enroll(claseId, userId, body) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const clase = await this.clases.findById(claseId).session(session);
      if (!clase) throw new AppError('Clase no encontrada', 404);
      const inscritos = await Reserva.countDocuments({ clase_id: clase._id, tipo: 'clase', estado: { $in: ['pendiente', 'confirmada'] } }).session(session);
      if (inscritos >= Number(clase.cupo_maximo || 0)) {
        throw new AppError('Sin cupo disponible', 409);
      }
      // check duplicate enrollment
      const exists = await Reserva.findOne({ usuario_id: userId, clase_id: clase._id, tipo: 'clase', estado: { $in: ['pendiente', 'confirmada'] } }).session(session);
      if (exists) throw new AppError('Ya tienes inscripción activa en esta clase', 409);

      const reserva = await this.reservas.insertOne({
        usuario_id: userId,
        tipo: 'clase',
        clase_id: clase._id,
        estado: 'confirmada',
        precio: Number(clase.precio || 0),
        horario: body?.horario || (Array.isArray(clase.horarios) ? clase.horarios[0] : undefined),
        fecha_creacion: new Date(),
      }, session);

      await session.commitTransaction();
      session.endSession();
      return { id: String(reserva._id), claseId: String(clase._id), estado: reserva.estado };
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      throw e;
    }
  }

  async mine(userId) {
    const reservas = await Reserva.find({ usuario_id: userId, tipo: 'clase', estado: { $in: ['pendiente', 'confirmada'] } }).lean();
    const out = [];
    for (const r of reservas) {
      const clase = r.clase_id ? await this.clases.findById(r.clase_id).lean() : null;
      const profesor = clase?.profesor_id ? await Usuario.findById(clase.profesor_id).lean() : null;
      out.push({
        id: String(r._id),
        reserva_id: String(r._id),
        clase_id: clase ? String(clase._id) : null,
        clase: toClaseView(clase, profesor, 0),
        estado: r.estado,
        precio: r.precio,
        horario: r.horario,
        fecha_creacion: r.fecha_creacion,
      });
    }
    return out;
  }

  async cancel(reservaId, userId) {
    const r = await Reserva.findById(reservaId);
    if (!r) throw new AppError('Inscripción no encontrada', 404);
    if (String(r.usuario_id) !== String(userId)) throw new AppError('No autorizado', 403);
    r.estado = 'cancelada';
    await r.save();
    return { id: String(r._id), estado: r.estado };
  }

  async create(data) { const c = await this.clases.insertOne(data); return toClaseView(c, null, 0); }
  async update(id, data) { const c = await this.clases.updateById(id, data); if (!c) throw new AppError('Clase no encontrada', 404); const profesor = c.profesor_id ? await Usuario.findById(c.profesor_id).lean() : null; const inscritos = await Reserva.countDocuments({ clase_id: c._id, tipo: 'clase', estado: { $in: ['pendiente', 'confirmada'] } }); return toClaseView(c, profesor, inscritos); }
  async remove(id) { const c = await this.clases.deleteById(id); if (!c) throw new AppError('Clase no encontrada', 404); return { id: String(id) }; }
}

module.exports = { ClaseService };
