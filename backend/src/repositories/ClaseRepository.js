'use strict';

const { Clase } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class ClaseRepository extends BaseRepository {
  constructor() {
    super(Clase);
  }
}

module.exports = { ClaseRepository };
