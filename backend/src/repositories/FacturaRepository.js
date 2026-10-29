'use strict';

const { Factura } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class FacturaRepository extends BaseRepository {
  constructor() {
    super(Factura);
  }

  findByPedido(pedidoId) {
    return this.model.findOne({ pedido_id: pedidoId });
  }
}

module.exports = { FacturaRepository };
