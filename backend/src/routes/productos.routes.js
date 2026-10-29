'use strict';
const { Router } = require('express');
const { validate } = require('../middlewares/validate');
const { requireRoles } = require('../middlewares/roles');
const { z } = require('zod');
const { objectId } = require('../utils/schemas/common.schema');

function createProductosRouter(svc, requireAuth) {
  const router = Router();
  const c = require('../controllers/productos.controller').createProductosController(svc);
  router.get('/', c.list);
  router.get('/:id', validate(z.object({ params: z.object({ id: objectId }) })), c.get);
  router.post('/', requireAuth, requireRoles('admin'), c.create);
  router.put('/:id', requireAuth, requireRoles('admin'), validate(z.object({ params: z.object({ id: objectId }) })), c.update);
  router.delete('/:id', requireAuth, requireRoles('admin'), validate(z.object({ params: z.object({ id: objectId }) })), c.remove);
  return router;
}
module.exports = { createProductosRouter };
