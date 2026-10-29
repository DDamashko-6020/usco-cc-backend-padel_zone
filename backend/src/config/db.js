'use strict';

const mongoose = require('mongoose');
const { env } = require('./env');

let connecting = null;

async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (connecting) return connecting;

  mongoose.set('strictQuery', true);
  connecting = mongoose.connect(env.mongoUri, { autoIndex: false });
  try {
    const conn = await connecting;
    connecting = null;
    return conn.connection;
  } catch (err) {
    connecting = null;
    throw err;
  }
}

function getConnection() {
  return mongoose.connection;
}

module.exports = { connectDb, getConnection };
