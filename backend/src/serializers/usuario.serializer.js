'use strict';

function toUsuarioDTO(doc) {
  if (!doc) return null;
  const o = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  const { password_hash, ...rest } = o;
  void password_hash;
  return {
    id: String(rest._id),
    name: rest.nombre,
    nombre: rest.nombre,
    email: rest.email,
    telefono: rest.telefono || '',
    rol: rest.rol,
    cargo: rest.cargo || null,
    foto: rest.foto_url || null,
  };
}

function toAuthDTO(user, token) {
  return { token, user: toUsuarioDTO(user) };
}

module.exports = { toUsuarioDTO, toAuthDTO };
