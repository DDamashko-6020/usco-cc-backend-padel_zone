'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const reservaSchema = new mongoose.Schema(
  {
    usuario_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    tipo: { type: String, required: true, enum: ['cancha', 'clase'] },
    cancha_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancha' },
    clase_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Clase' },
    fecha: { type: String },
    hora_inicio: { type: String },
    hora_fin: { type: String },
    horario: { type: String },
    estado: { type: String, required: true, enum: ['pendiente', 'confirmada', 'cancelada'] },
    precio: { type: Number, required: true },
    fecha_creacion: { type: Date },
  },
  schemaOptions('reservas'),
);

module.exports = mongoose.models.Reserva || mongoose.model('Reserva', reservaSchema);
