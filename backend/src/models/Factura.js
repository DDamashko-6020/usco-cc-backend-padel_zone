'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const facturaSchema = new mongoose.Schema(
  {
    pedido_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pedido' },
    numero: { type: String },
    total: { type: Number, required: true },
    fecha: { type: Date, required: true },
    estado: { type: String },
  },
  schemaOptions('factura'),
);

module.exports = mongoose.models.Factura || mongoose.model('Factura', facturaSchema);
