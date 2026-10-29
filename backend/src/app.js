'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const { env } = require('./config/env');
const { BODY_LIMIT } = require('./config/constants');
const { globalLimiter } = require('./middlewares/rateLimits');
const { errorHandler } = require('./middlewares/errorHandler');
const { notFound } = require('./middlewares/notFound');
const { createApiRouter } = require('./routes');
const { createContainer } = require('./container');

function createApp() {
  const app = express();
  const container = createContainer();
  app.locals.container = container;

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({
    origin(origin, cb) {
      if (!origin || env.corsOrigin.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
  }));
  app.use(express.json({ limit: BODY_LIMIT }));
  app.use(express.urlencoded({ extended: false, limit: BODY_LIMIT }));
  app.use(mongoSanitize());
  app.use(hpp());
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
  app.use(globalLimiter);

  app.use('/api', createApiRouter(container));
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
