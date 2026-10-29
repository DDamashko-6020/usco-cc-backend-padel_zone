'use strict';

const { Usuario } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
  }

  findByEmail(email) {
    return this.model.findOne({ email: String(email).toLowerCase() });
  }

  findByEmailWithPassword(email) {
    return this.model.findOne({ email: String(email).toLowerCase() }).select('+password_hash');
  }

  findByIdWithPassword(id) {
    return this.model.findById(id).select('+password_hash');
  }
}

module.exports = { UsuarioRepository };
