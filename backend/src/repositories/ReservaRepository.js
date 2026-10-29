'use strict';

const { Reserva } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class ReservaRepository extends BaseRepository {
  constructor() {
    super(Reserva);
  }

  findByUsuario(usuarioId) {
    return this.model.find({ usuario_id: usuarioId }).sort({ fecha_creacion: -1 });
  }

  countClaseActivas(claseId) {
    return this.model.countDocuments({
      clase_id: claseId,
      tipo: 'clase',
      estado: { $in: ['pendiente', 'confirmada'] },
    });
  }

  findSolapesCancha({ cancha_id, fecha, hora_inicio, hora_fin, excludeId }) {
    const filter = {
      cancha_id,
      fecha,
      tipo: 'cancha',
      estado: { $in: ['pendiente', 'confirmada'] },
      hora_inicio: { $lt: hora_fin },
      hora_fin: { $gt: hora_inicio },
    };
    if (excludeId) filter._id = { $ne: excludeId };
    return this.model.find(filter);
  }
}

module.exports = { ReservaRepository };
