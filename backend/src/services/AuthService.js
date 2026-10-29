'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { BCRYPT_ROUNDS } = require('../config/constants');
const { AppError } = require('../utils/AppError');
const { toAuthDTO, toUsuarioDTO } = require('../serializers/usuario.serializer');

class AuthService {
  constructor(usuarioRepository) {
    this.usuarios = usuarioRepository;
  }

  #sign(user) {
    return jwt.sign(
      { id: String(user._id), rol: user.rol },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn },
    );
  }

  async register({ name, email, password, phone }) {
    const normalized = String(email).toLowerCase().trim();
    const exists = await this.usuarios.findByEmail(normalized);
    if (exists) {
      throw new AppError('No se pudo completar el registro', 409);
    }

    const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user = await this.usuarios.insertOne({
      nombre: name.trim(),
      email: normalized,
      password_hash,
      rol: 'cliente',
      ...(phone ? { telefono: phone.trim() } : {}),
      fecha_registro: new Date(),
    });

    return toAuthDTO(user, this.#sign(user));
  }

  async login({ email, password }) {
    const user = await this.usuarios.findByEmailWithPassword(String(email).toLowerCase().trim());
    const invalid = new AppError('Credenciales inválidas', 401);
    if (!user || !user.password_hash) throw invalid;

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw invalid;

    return toAuthDTO(user, this.#sign(user));
  }

  async getProfile(userId) {
    const user = await this.usuarios.findById(userId);
    if (!user) throw new AppError('No autorizado', 401);
    return toUsuarioDTO(user);
  }

  async updateProfile(userId, { name, email, phone }) {
    const patch = {};
    if (name) patch.nombre = name.trim();
    if (phone) patch.telefono = phone.trim();
    if (email) {
      const normalized = String(email).toLowerCase().trim();
      const other = await this.usuarios.findByEmail(normalized);
      if (other && String(other._id) !== String(userId)) {
        throw new AppError('No se pudo actualizar el perfil', 409);
      }
      patch.email = normalized;
    }
    const user = await this.usuarios.updateById(userId, patch);
    if (!user) throw new AppError('No autorizado', 401);
    return toUsuarioDTO(user);
  }
}

module.exports = { AuthService };
