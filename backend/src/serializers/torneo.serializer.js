'use strict';

function formatPrice(p) {
  if (p === null || p === undefined) return 0;
  return Number(p);
}

function toTorneoView(torneo, participantesCount) {
  if (!torneo) return null;
  const o = typeof torneo.toObject === 'function' ? torneo.toObject() : torneo;
  const cupo = Number(o.cupo_maximo_parejas || 0);
  const inscritos = Number(participantesCount || 0);
  const spotsLeft = Math.max(0, cupo - inscritos);

  return {
    id: String(o._id),
    _id: String(o._id),
    nombre: o.nombre,
    name: o.nombre,
    descripcion: o.descripcion || '',
    desc: o.descripcion || '',
    fecha: o.fecha,
    date: o.fecha,
    fecha_fin: o.fecha_fin,
    endDate: o.fecha_fin,
    categoria: o.categoria || '',
    category: o.categoria || '',
    nivel: o.nivel || '',
    level: o.nivel || '',
    lugar: o.lugar || '',
    location: o.lugar || '',
    precio_inscripcion: o.precio_inscripcion,
    fee: o.precio_inscripcion,
    cupo_maximo_parejas: cupo,
    spots: cupo,
    spotsLeft,
    premio: o.premio || null,
    prize: o.premio || null,
    imagen_url: o.imagen_url || null,
    img: o.imagen_url || null,
  };
}

module.exports = { toTorneoView };
