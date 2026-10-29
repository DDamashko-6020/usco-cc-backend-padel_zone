'use strict';

function success(res, data, message = 'OK', status = 200) {
  return res.status(status).json({ ok: true, data, message });
}

function fail(res, message, status = 400) {
  return res.status(status).json({ ok: false, data: null, message });
}

module.exports = { success, fail };
