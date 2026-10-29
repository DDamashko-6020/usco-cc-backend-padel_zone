'use strict';

const { Cancha } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class CanchaRepository extends BaseRepository {
  constructor() {
    super(Cancha);
  }
}

module.exports = { CanchaRepository };
