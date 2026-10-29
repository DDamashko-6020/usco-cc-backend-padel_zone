'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const torneoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    fecha: { type: String, required: true },
    fecha_fin: { type: String, required: true },
    categoria: { type: String },
    nivel: { type: String },
    lugar: { type: String },
    precio_inscripcion: { type: Number, required: true },
    cupo_maximo_parejas: { type: Number, required: true },
    premio: { type: String },
    imagen_url: { type: String },
  },
  schemaOptions('torneos'),
);

module.exports = mongoose.models.Torneo || mongoose.model('Torneo', torneoSchema);
