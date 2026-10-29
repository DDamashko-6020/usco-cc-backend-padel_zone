'use strict';

module.exports = Object.freeze({
  BCRYPT_ROUNDS: 12,
  ROLES: Object.freeze(['cliente', 'profesor', 'admin']),
  TIPO_RESERVA: Object.freeze({ CANCHA: 'cancha', CLASE: 'clase' }),
  ESTADO_RESERVA: Object.freeze({
    PENDIENTE: 'pendiente',
    CONFIRMADA: 'confirmada',
    CANCELADA: 'cancelada',
  }),
  ESTADO_PEDIDO: Object.freeze({
    PENDIENTE: 'pendiente',
    PAGADO: 'pagado',
    CANCELADO: 'cancelado',
  }),
  ENVIO: Object.freeze({
    COSTO: 15000,
    GRATIS_DESDE: 300000,
  }),
  BODY_LIMIT: '10kb',
});
