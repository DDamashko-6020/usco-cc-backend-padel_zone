'use strict';

const { Torneo } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class TorneoRepository extends BaseRepository {
  constructor() {
    super(Torneo);
  }
}

module.exports = { TorneoRepository };
