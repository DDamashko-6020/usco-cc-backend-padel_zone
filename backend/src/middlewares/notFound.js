'use strict';

const { fail } = require('../utils/response');

function notFound(_req, res) {
  return fail(res, 'No encontrado', 404);
}

module.exports = { notFound };
