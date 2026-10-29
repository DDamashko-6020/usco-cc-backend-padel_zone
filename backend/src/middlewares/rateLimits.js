'use strict';

const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, data: null, message: 'Demasiadas solicitudes' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, data: null, message: 'Demasiados intentos. Inténtalo más tarde' },
});

module.exports = { globalLimiter, authLimiter };
