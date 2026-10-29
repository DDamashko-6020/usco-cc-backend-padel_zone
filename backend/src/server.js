'use strict';

const { env } = require('./config/env');
const { connectDb } = require('./config/db');
const { createApp } = require('./app');
const { info, error } = require('./utils/logger');

async function start() {
  await connectDb();
  const app = createApp();
  app.listen(env.port, () => {
    info(`API lista en puerto ${env.port}`);
  });
}

start().catch((err) => {
  error('Fallo al arrancar', { message: err.message });
  process.exit(1);
});
