'use strict';

function toCanchaDTO(c) {
  if (!c) return null;
  const o = typeof c.toObject === 'function' ? c.toObject() : c;
  return {
    id: String(o._id),
    _id: String(o._id),
    nombre: o.nombre,
    name: o.nombre,
    tipo: o.tipo || '',
    type: o.tipo || '',
    precio_por_hora: Number(o.precio_por_hora || 0),
    precio_hora: Number(o.precio_por_hora || 0),
    price: Number(o.precio_por_hora || 0),
    disponible: !!o.disponible,
    descripcion: o.descripcion || '',
    desc: o.descripcion || '',
    imagen_url: o.imagen_url || null,
    img: o.imagen_url || null,
    caracteristicas: o.caracteristicas || [],
  };
}

module.exports = { toCanchaDTO };
