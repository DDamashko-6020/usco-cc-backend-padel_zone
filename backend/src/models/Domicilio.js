'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const domicilioSchema = new mongoose.Schema(
  {
    pedido_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pedido' },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
  },
  schemaOptions('domicilio'),
);

module.exports = mongoose.models.Domicilio || mongoose.model('Domicilio', domicilioSchema);
