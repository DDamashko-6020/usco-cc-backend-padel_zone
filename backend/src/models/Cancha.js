'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const canchaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    precio_por_hora: { type: Number, required: true },
    disponible: { type: Boolean, required: true },
    descripcion: { type: String },
    imagen_url: { type: String },
    caracteristicas: { type: [String], default: undefined },
  },
  schemaOptions('canchas'),
);

module.exports = mongoose.models.Cancha || mongoose.model('Cancha', canchaSchema);
