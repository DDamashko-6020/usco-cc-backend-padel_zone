'use strict';

const mongoose = require('mongoose');

function isObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value) && String(new mongoose.Types.ObjectId(value)) === String(value);
}

function toObjectId(value) {
  return new mongoose.Types.ObjectId(value);
}

module.exports = { isObjectId, toObjectId };
