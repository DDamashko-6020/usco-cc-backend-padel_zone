'use strict';

const { Router } = require('express');
const { validate } = require('../middlewares/validate');
const { patchProfileSchema } = require('../utils/schemas/auth.schema');
const { createProfileController } = require('../controllers/profile.controller');

function createProfileRouter(authService, requireAuth) {
  const router = Router();
  const c = createProfileController(authService);
  router.get('/', requireAuth, c.get);
  router.patch('/', requireAuth, validate(patchProfileSchema), c.patch);
  return router;
}

module.exports = { createProfileRouter };
