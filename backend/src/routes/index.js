'use strict';

const { Router } = require('express');
const { createAuthRouter } = require('./auth.routes');
const { createProfileRouter } = require('./profile.routes');
const { createCanchasRouter } = require('./canchas.routes');
const { createReservasRouter } = require('./reservas.routes');
const { createClasesRouter } = require('./clases.routes');
const { createTorneosRouter } = require('./torneos.routes');
const { createProductosRouter } = require('./productos.routes');
const { createPedidosRouter } = require('./pedidos.routes');
const { createUsuariosRouter } = require('./usuarios.routes');
const { success } = require('../utils/response');

function createApiRouter(container) {
  const router = Router();
  router.get('/health', (_req, res) => success(res, { status: 'up' }, 'OK'));
  router.use('/auth', createAuthRouter(container.services.auth));
  router.use('/profile', createProfileRouter(container.services.auth, container.authMw.requireAuth));
  router.use('/users', createUsuariosRouter(container.services.usuarios, container.authMw.requireAuth));
  router.use('/courts', createCanchasRouter(container.services.canchas, container.authMw.requireAuth));
  router.use('/canchas', createCanchasRouter(container.services.canchas, container.authMw.requireAuth));
  router.use('/reservations', createReservasRouter(container.services.reservas, container.authMw.requireAuth));
  router.use('/reservas', createReservasRouter(container.services.reservas, container.authMw.requireAuth));
  router.use('/classes', createClasesRouter(container.services.clases, container.authMw.requireAuth));
  router.use('/clases', createClasesRouter(container.services.clases, container.authMw.requireAuth));
  router.use('/tournaments', createTorneosRouter(container.services.torneos, container.authMw.requireAuth));
  router.use('/torneos', createTorneosRouter(container.services.torneos, container.authMw.requireAuth));
  router.use('/products', createProductosRouter(container.services.productos, container.authMw.requireAuth));
  router.use('/productos', createProductosRouter(container.services.productos, container.authMw.requireAuth));
  router.use('/orders', createPedidosRouter(container.services.pedidos, container.authMw.requireAuth));
  router.use('/pedidos', createPedidosRouter(container.services.pedidos, container.authMw.requireAuth));
  return router;
}

module.exports = { createApiRouter };
