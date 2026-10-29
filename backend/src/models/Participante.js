'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const participanteSchema = new mongoose.Schema(
  {
    torneo_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Torneo' },
    usuario_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    pareja_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    nivel: { type: String },
    telefono: { type: String },
    pago_confirmado: { type: Boolean, required: true },
    fecha_inscripcion: { type: Date },
  },
  schemaOptions('participantes'),
);

module.exports = mongoose.models.Participante || mongoose.model('Participante', participanteSchema);
