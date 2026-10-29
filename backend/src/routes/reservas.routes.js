'use strict';
const { Router } = require('express');
const { validate } = require('../middlewares/validate');
const { requireRoles } = require('../middlewares/roles');
const { z } = require('zod');
const { objectId, fechaIso, horaHmm } = require('../utils/schemas/common.schema');

function createReservasRouter(svc, requireAuth) {
  const router = Router();
  const c = require('../controllers/reservas.controller').createReservasController(svc);
  const body = z.object({
    cancha_id: objectId,
    fecha: fechaIso,
    hora_inicio: z.string().min(1),
    hora_fin: z.string().min(1),
    name: z.string().optional(),
    nombre: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }).strict();
  router.post('/', requireAuth, validate(z.object({ body })), c.create);
  router.get('/mine', requireAuth, c.mine);
  router.delete('/:id', requireAuth, validate(z.object({ params: z.object({ id: objectId }) })), c.cancel);
  router.get('/', requireAuth, requireRoles('admin'), c.listAll);
  return router;
}
module.exports = { createReservasRouter };
