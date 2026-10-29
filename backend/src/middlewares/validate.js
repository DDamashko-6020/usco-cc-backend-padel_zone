'use strict';

const { AppError } = require('../utils/AppError');

function validate(schema) {
  return (req, _res, next) => {
    const parsed = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (!parsed.success) {
      throw new AppError('Datos inválidos', 400);
    }
    req.validated = parsed.data;
    next();
  };
}

module.exports = { validate };
