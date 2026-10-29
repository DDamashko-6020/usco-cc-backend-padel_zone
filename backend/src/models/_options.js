'use strict';

function schemaOptions(collection) {
  return { collection, timestamps: false, versionKey: false, strict: true };
}

module.exports = { schemaOptions };
