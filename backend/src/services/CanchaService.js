'use strict';

const { AppError } = require('../utils/AppError');
const { toCanchaDTO } = require('../serializers/cancha.serializer');

class CanchaService {
  constructor(repos) {
    this.canchas = repos.canchas;
  }

  async list() {
    const list = await this.canchas.find({});
    return list.map(toCanchaDTO);
  }

  async getById(id) {
    const c = await this.canchas.findById(id);
    if (!c) throw new AppError('Cancha no encontrada', 404);
    return toCanchaDTO(c);
  }

  async create(data) {
    const c = await this.canchas.insertOne(data);
    return toCanchaDTO(c);
  }

  async update(id, data) {
    const c = await this.canchas.updateById(id, data);
    if (!c) throw new AppError('Cancha no encontrada', 404);
    return toCanchaDTO(c);
  }

  async remove(id) {
    const c = await this.canchas.deleteById(id);
    if (!c) throw new AppError('Cancha no encontrada', 404);
    return { id: String(id) };
  }

  async availability(id, fecha) {
    const c = await this.canchas.findById(id);
    if (!c) throw new AppError('Cancha no encontrada', 404);
    // occupied hours from reservas (pendiente/confirmada) tipo cancha
    const Reserva = require('../models').Reserva;
    const reservas = await Reserva.find({ cancha_id: c._id, fecha, estado: { $in: ['pendiente', 'confirmada'] } }).lean();
    const occupied = [];
    for (const r of reservas) {
      if (r.hora_inicio && r.hora_fin) {
        const hi = parseInt(String(r.hora_inicio).split(':')[0]);
        const hf = parseInt(String(r.hora_fin).split(':')[0]);
        for (let h = hi; h < hf; h++) occupied.push(h);
      } else if (r.horario) {
        // try parse
      }
    }
    return { canchaId: String(c._id), fecha, occupiedHours: [...new Set(occupied)] };
  }
}

module.exports = { CanchaService };
