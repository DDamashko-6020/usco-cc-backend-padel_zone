'use strict';
const { Router } = require('express');
const { validate } = require('../middlewares/validate');
const { requireRoles } = require('../middlewares/roles');
const { z } = require('zod');
const { objectId } = require('../utils/schemas/common.schema');

function createTorneosRouter(svc, requireAuth) {
  const router = Router();
  const c = require('../controllers/torneos.controller').createTorneosController(svc);
  router.get('/', c.list);
  router.get('/:id', validate(z.object({ params: z.object({ id: objectId }) })), c.get);
  router.post('/:id/register', requireAuth, validate(z.object({ params: z.object({ id: objectId }) })), c.register);
  router.post('/registrations/:participanteId/pay', requireAuth, validate(z.object({ params: z.object({ participanteId: objectId }) })), c.pay);
  router.get('/registrations/mine', requireAuth, c.mine);
  router.delete('/registrations/:participanteId', requireAuth, validate(z.object({ params: z.object({ participanteId: objectId }) })), c.cancel);
  router.post('/', requireAuth, requireRoles('admin'), c.create);
  router.put('/:id', requireAuth, requireRoles('admin'), validate(z.object({ params: z.object({ id: objectId }) })), c.update);
  router.delete('/:id', requireAuth, requireRoles('admin'), validate(z.object({ params: z.object({ id: objectId }) })), c.remove);
  return router;
}
module.exports = { createTorneosRouter };
