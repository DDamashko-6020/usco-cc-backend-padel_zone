'use strict';

const { AppError } = require('./AppError');

function isAdmin(user) {
  return user?.rol === 'admin';
}

function assertOwner(resourceUserId, user) {
  if (isAdmin(user)) return;
  if (!user || String(resourceUserId) !== String(user.id)) {
    throw new AppError('No autorizado', 403);
  }
}

module.exports = { isAdmin, assertOwner };
