'use strict';

const { fail } = require('../utils/response');
const { error: logError } = require('../utils/logger');
const { env } = require('../config/env');

function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || err.status || 500;
  const operational = err.isOperational === true;

  logError('error', {
    status,
    message: err.message,
    name: err.name,
    stack: env.nodeEnv === 'development' && !String(err.message).match(/password|token/i)
      ? err.stack
      : undefined,
  });

  if (err.name === 'ZodError') {
    return fail(res, 'Datos inválidos', 400);
  }
  if (err.code === 11000) {
    return fail(res, 'No se pudo completar la operación', 409);
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return fail(res, 'Datos inválidos', 400);
  }

  const message = operational && status < 500 ? err.message : 'Error interno';
  return fail(res, message, status < 500 ? status : 500);
}

module.exports = { errorHandler };
