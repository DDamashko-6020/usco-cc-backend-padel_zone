'use strict';

const { PedidoItem } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class PedidoItemRepository extends BaseRepository {
  constructor() {
    super(PedidoItem);
  }

  findByPedido(pedidoId) {
    return this.model.find({ pedido_id: pedidoId });
  }
}

module.exports = { PedidoItemRepository };
