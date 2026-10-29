'use strict';

const { Participante } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class ParticipanteRepository extends BaseRepository {
  constructor() {
    super(Participante);
  }

  countByTorneo(torneoId) {
    return this.model.countDocuments({ torneo_id: torneoId });
  }

  findByUsuarioAndTorneo(usuarioId, torneoId) {
    return this.model.findOne({ usuario_id: usuarioId, torneo_id: torneoId });
  }

  findByUsuario(usuarioId) {
    return this.model.find({ usuario_id: usuarioId }).sort({ fecha_inscripcion: -1 });
  }
}

module.exports = { ParticipanteRepository };
