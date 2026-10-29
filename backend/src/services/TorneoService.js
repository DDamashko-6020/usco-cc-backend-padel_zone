'use strict';

const mongoose = require('mongoose');
const { AppError } = require('../utils/AppError');
const { toTorneoView } = require('../serializers/torneo.serializer');
const { Torneo, Participante } = require('../models');

class TorneoService {
  constructor(repos) {
    this.torneos = repos.torneos;
    this.participantes = repos.participantes;
  }

  async list() {
    const list = await this.torneos.find({}).lean();
    const out = [];
    for (const t of list) {
      const count = await Participante.countDocuments({ torneo_id: t._id });
      out.push(toTorneoView(t, count));
    }
    return out;
  }

  async getById(id) {
    const t = await this.torneos.findById(id).lean();
    if (!t) throw new AppError('Torneo no encontrado', 404);
    const count = await Participante.countDocuments({ torneo_id: t._id });
    return toTorneoView(t, count);
  }

  async register(torneoId, userId, body) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const torneo = await this.torneos.findById(torneoId).session(session);
      if (!torneo) throw new AppError('Torneo no encontrado', 404);

      const count = await Participante.countDocuments({ torneo_id: torneo._id }).session(session);
      if (count >= Number(torneo.cupo_maximo_parejas || 0)) {
        throw new AppError('Sin cupo de parejas disponible', 409);
      }

      // avoid duplicate registration by usuario
      const exists = await Participante.findOne({ torneo_id: torneo._id, usuario_id: userId }).session(session);
      if (exists) throw new AppError('Ya te encuentras inscrito en este torneo', 409);

      const participante = await this.participantes.insertOne({
        torneo_id: torneo._id,
        usuario_id: userId,
        pareja_id: body?.pareja_id || userId, // allow same if not provided, schema requires
        nivel: body?.nivel || null,
        telefono: body?.phone || body?.telefono || null,
        pago_confirmado: false,
        fecha_inscripcion: new Date(),
      }, session);

      await session.commitTransaction();
      session.endSession();
      return {
        id: String(participante._id),
        torneoId: String(torneo._id),
        pago_confirmado: false,
      };
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      throw e;
    }
  }

  async pay(participanteId, userId) {
    const p = await Participante.findById(participanteId);
    if (!p) throw new AppError('Inscripción no encontrada', 404);
    if (String(p.usuario_id) !== String(userId)) throw new AppError('No autorizado', 403);
    p.pago_confirmado = true;
    await p.save();
    return { id: String(p._id), pago_confirmado: true };
  }

  async mine(userId) {
    const list = await Participante.find({ usuario_id: userId }).lean();
    const out = [];
    for (const p of list) {
      const t = p.torneo_id ? await this.torneos.findById(p.torneo_id).lean() : null;
      out.push({
        id: String(p._id),
        participante_id: String(p._id),
        torneo: toTorneoView(t, 0),
        pago_confirmado: !!p.pago_confirmado,
        fecha_inscripcion: p.fecha_inscripcion,
      });
    }
    return out;
  }

  async cancel(participanteId, userId) {
    const p = await Participante.findById(participanteId);
    if (!p) throw new AppError('Inscripción no encontrada', 404);
    if (String(p.usuario_id) !== String(userId)) throw new AppError('No autorizado', 403);
    await p.deleteOne();
    return { id: String(participanteId) };
  }

  async create(data) { const t = await this.torneos.insertOne(data); const count = await Participante.countDocuments({ torneo_id: t._id }); return toTorneoView(t, count); }
  async update(id, data) { const t = await this.torneos.updateById(id, data); if (!t) throw new AppError('Torneo no encontrado', 404); const count = await Participante.countDocuments({ torneo_id: t._id }); return toTorneoView(t, count); }
  async remove(id) { const t = await this.torneos.deleteById(id); if (!t) throw new AppError('Torneo no encontrado', 404); return { id: String(id) }; }
}

module.exports = { TorneoService };
