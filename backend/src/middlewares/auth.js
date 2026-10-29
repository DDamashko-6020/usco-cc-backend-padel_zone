'use strict';

const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../utils/asyncHandler');

function createAuthMiddleware(usuarioRepository) {
  const requireAuth = asyncHandler(async (req, _res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new AppError('No autorizado', 401);

    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch {
      throw new AppError('No autorizado', 401);
    }

    const user = await usuarioRepository.findById(payload.id);
    if (!user) throw new AppError('No autorizado', 401);

    req.user = { id: String(user._id), rol: user.rol };
    req.userDoc = user;
    next();
  });

  return { requireAuth };
}

module.exports = { createAuthMiddleware };
