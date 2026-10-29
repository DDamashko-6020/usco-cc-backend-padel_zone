'use strict';

const { Router } = require('express');
const { validate } = require('../middlewares/validate');
const { authLimiter } = require('../middlewares/rateLimits');
const { registerSchema, loginSchema } = require('../utils/schemas/auth.schema');
const { createAuthController } = require('../controllers/auth.controller');

function createAuthRouter(authService) {
  const router = Router();
  const c = createAuthController(authService);
  router.post('/register', authLimiter, validate(registerSchema), c.register);
  router.post('/login', authLimiter, validate(loginSchema), c.login);
  return router;
}

module.exports = { createAuthRouter };
