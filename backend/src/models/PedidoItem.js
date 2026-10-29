'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const pedidoItemSchema = new mongoose.Schema(
  {
    pedido_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pedido' },
    producto_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto' },
    cantidad: { type: Number, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
  },
  schemaOptions('pedido_items'),
);

module.exports = mongoose.models.PedidoItem || mongoose.model('PedidoItem', pedidoItemSchema);
