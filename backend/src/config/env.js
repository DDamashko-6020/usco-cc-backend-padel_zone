'use strict';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const REQUIRED = ['MONGODB_URI', 'JWT_SECRET'];

function loadEnv() {
  const missing = REQUIRED.filter((k) => !process.env[k] || !String(process.env[k]).trim());
  if (missing.length) {
    throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
  }
  if (process.env.JWT_SECRET.length < 16) {
    throw new Error('JWT_SECRET debe tener al menos 16 caracteres');
  }

  const corsOrigin = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return Object.freeze({
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    corsOrigin,
  });
}

module.exports = { env: loadEnv() };
