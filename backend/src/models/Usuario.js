'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password_hash: { type: String, required: true, select: false },
    rol: { type: String, required: true, enum: ['cliente', 'profesor', 'admin'] },
    telefono: { type: String },
    cargo: { type: String },
    foto_url: { type: String },
    fecha_registro: { type: Date },
  },
  schemaOptions('usuarios'),
);

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
