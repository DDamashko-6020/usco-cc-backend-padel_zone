'use strict';

function info(msg, meta) {
  if (meta) console.log(`[INFO] ${msg}`, meta);
  else console.log(`[INFO] ${msg}`);
}

function warn(msg, meta) {
  if (meta) console.warn(`[WARN] ${msg}`, meta);
  else console.warn(`[WARN] ${msg}`);
}

function error(msg, meta) {
  if (meta) console.error(`[ERR] ${msg}`, meta);
  else console.error(`[ERR] ${msg}`);
}

module.exports = { info, warn, error };
