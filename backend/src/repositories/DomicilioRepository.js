'use strict';

const { Domicilio } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class DomicilioRepository extends BaseRepository {
  constructor() {
    super(Domicilio);
  }

  findByPedido(pedidoId) {
    return this.model.findOne({ pedido_id: pedidoId });
  }
}

module.exports = { DomicilioRepository };
