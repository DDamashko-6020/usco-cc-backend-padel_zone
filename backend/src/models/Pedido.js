'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const pedidoSchema = new mongoose.Schema(
  {
    usuario_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    estado: { type: String, required: true, enum: ['pendiente', 'pagado', 'cancelado'] },
    subtotal: { type: Number, required: true },
    envio: { type: Number, required: true },
    total: { type: Number, required: true },
    metodo_pago: { type: String },
    fecha_creacion: { type: Date },
  },
  schemaOptions('pedidos'),
);

module.exports = mongoose.models.Pedido || mongoose.model('Pedido', pedidoSchema);
