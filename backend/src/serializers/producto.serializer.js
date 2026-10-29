'use strict';

function toProductoDTO(p) {
  if (!p) return null;
  const o = typeof p.toObject === 'function' ? p.toObject() : p;
  return {
    id: String(o._id),
    _id: String(o._id),
    nombre: o.nombre,
    name: o.nombre,
    descripcion: o.descripcion || '',
    desc: o.descripcion || '',
    precio: Number(o.precio || 0),
    price: Number(o.precio || 0),
    stock: Number(o.stock || 0),
    imagen_url: o.imagen_url || null,
    img: o.imagen_url || null,
    badge: o.badge || null,
    badgeColor: o.badge_color || null,
    badge_color: o.badge_color || null,
  };
}

module.exports = { toProductoDTO };
