'use strict';

const { AppError } = require('../utils/AppError');

function requireRoles(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      throw new AppError('No autorizado', 403);
    }
    next();
  };
}

module.exports = { requireRoles };
