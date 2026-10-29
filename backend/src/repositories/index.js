'use strict';

const { UsuarioRepository } = require('./UsuarioRepository');
const { CanchaRepository } = require('./CanchaRepository');
const { ClaseRepository } = require('./ClaseRepository');
const { ReservaRepository } = require('./ReservaRepository');
const { TorneoRepository } = require('./TorneoRepository');
const { ParticipanteRepository } = require('./ParticipanteRepository');
const { ProductoRepository } = require('./ProductoRepository');
const { PedidoRepository } = require('./PedidoRepository');
const { PedidoItemRepository } = require('./PedidoItemRepository');
const { DomicilioRepository } = require('./DomicilioRepository');
const { FacturaRepository } = require('./FacturaRepository');

function createRepositories() {
  return {
    usuarios: new UsuarioRepository(),
    canchas: new CanchaRepository(),
    clases: new ClaseRepository(),
    reservas: new ReservaRepository(),
    torneos: new TorneoRepository(),
    participantes: new ParticipanteRepository(),
    productos: new ProductoRepository(),
    pedidos: new PedidoRepository(),
    pedidoItems: new PedidoItemRepository(),
    domicilio: new DomicilioRepository(),
    factura: new FacturaRepository(),
  };
}

module.exports = { createRepositories };
