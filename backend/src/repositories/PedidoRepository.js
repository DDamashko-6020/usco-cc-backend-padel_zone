'use strict';

const { Pedido } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class PedidoRepository extends BaseRepository {
  constructor() {
    super(Pedido);
  }

  findByUsuario(usuarioId) {
    return this.model.find({ usuario_id: usuarioId }).sort({ fecha_creacion: -1 });
  }
}

module.exports = { PedidoRepository };
