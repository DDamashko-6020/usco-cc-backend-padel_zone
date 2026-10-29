'use strict';

const bcrypt = require('bcrypt');
const { AppError } = require('../utils/AppError');
const { BCRYPT_ROUNDS } = require('../config/constants');
const { toUsuarioDTO } = require('../serializers/usuario.serializer');

class UsuarioService {
  constructor(repos) { this.usuarios = repos.usuarios; }
  async list() { const list = await this.usuarios.find({}); return list.map(toUsuarioDTO); }
  async getById(id) { const u = await this.usuarios.findById(id); if (!u) throw new AppError('Usuario no encontrado', 404); return toUsuarioDTO(u); }
  async create({ name, email, password, phone, rol = 'cliente' }) {
    const normalized = String(email).toLowerCase().trim();
    const exists = await this.usuarios.findByEmail(normalized);
    if (exists) throw new AppError('No se pudo completar la operación', 409);
    const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const u = await this.usuarios.insertOne({ nombre: name.trim(), email: normalized, password_hash, rol, telefono: phone || undefined, fecha_registro: new Date() });
    return toUsuarioDTO(u);
  }
  async update(id, data) {
    const patch = {};
    if (data.name || data.nombre) patch.nombre = (data.name || data.nombre).trim();
    if (data.email) patch.email = String(data.email).toLowerCase().trim();
    if (data.phone || data.telefono) patch.telefono = data.phone || data.telefono;
    if (data.rol) patch.rol = data.rol;
    if (data.password) patch.password_hash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);
    const u = await this.usuarios.updateById(id, patch);
    if (!u) throw new AppError('Usuario no encontrado', 404);
    return toUsuarioDTO(u);
  }
  async remove(id) { const u = await this.usuarios.deleteById(id); if (!u) throw new AppError('Usuario no encontrado', 404); return { id: String(id) }; }
}

module.exports = { UsuarioService };
