'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagen_url: { type: String },
    badge: { type: String },
    badge_color: { type: String },
  },
  schemaOptions('productos'),
);

module.exports = mongoose.models.Producto || mongoose.model('Producto', productoSchema);
