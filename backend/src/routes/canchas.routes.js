'use strict';
const { Router } = require('express');
const { validate } = require('../middlewares/validate');
const { requireRoles } = require('../middlewares/roles');
const { z } = require('zod');
const { objectId, fechaIso } = require('../utils/schemas/common.schema');

function createCanchasRouter(svc, requireAuth) {
  const router = Router();
  const c = require('../controllers/canchas.controller').createCanchasController(svc);
  router.get('/', c.list);
  router.get('/:id', validate(z.object({ params: z.object({ id: objectId }) })), c.get);
  router.get('/:id/availability', validate(z.object({ params: z.object({ id: objectId }), query: z.object({ fecha: fechaIso }) })), c.availability);
  router.post('/', requireAuth, requireRoles('admin'), c.create);
  router.put('/:id', requireAuth, requireRoles('admin'), validate(z.object({ params: z.object({ id: objectId }) })), c.update);
  router.delete('/:id', requireAuth, requireRoles('admin'), validate(z.object({ params: z.object({ id: objectId }) })), c.remove);
  return router;
}
module.exports = { createCanchasRouter };
