'use strict';
const { Router } = require('express');
const { validate } = require('../middlewares/validate');
const { requireRoles } = require('../middlewares/roles');
const { z } = require('zod');
const { objectId } = require('../utils/schemas/common.schema');

function createUsuariosRouter(svc, requireAuth) {
  const router = Router();
  const c = require('../controllers/usuarios.controller').createUsuariosController(svc);
  router.use(requireAuth, requireRoles('admin'));
  router.get('/', c.list);
  router.post('/', c.create);
  router.get('/:id', validate(z.object({ params: z.object({ id: objectId }) })), c.get);
  router.put('/:id', validate(z.object({ params: z.object({ id: objectId }) })), c.update);
  router.delete('/:id', validate(z.object({ params: z.object({ id: objectId }) })), c.remove);
  return router;
}
module.exports = { createUsuariosRouter };
