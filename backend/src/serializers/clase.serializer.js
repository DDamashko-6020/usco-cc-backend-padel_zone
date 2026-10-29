'use strict';

const images = [
  require('path').resolve(__dirname, '../../../frontend/src/img/intensivas.jpg'),
];

function formatPrice(p) {
  if (p === null || p === undefined) return '$0';
  try {
    return `$${Number(p).toLocaleString('es-CO')}`;
  } catch {
    return `$${p}`;
  }
}

function toClaseView(clase, profesor, inscritosCount) {
  if (!clase) return null;
  const o = typeof clase.toObject === 'function' ? clase.toObject() : clase;
  const cupo = Number(o.cupo_maximo || 0);
  const inscritos = Number(inscritosCount || 0);
  const precioStr = formatPrice(o.precio);

  // Compose grupos for frontend (group by rango_edad)
  const grupo = {
    edad: o.rango_edad || 'General',
    profesor: profesor ? {
      nombre: profesor.nombre || profesor.name || '',
      foto: profesor.foto_url || profesor.foto || null,
    } : { nombre: 'Profesor', foto: null },
    precio: precioStr,
    cupos: `${inscritos}/${cupo}`,
  };

  return {
    id: String(o._id),
    nombre: o.nombre,
    descripcion: o.descripcion || '',
    imagen: o.imagen_url || null,
    horaInicio: o.hora_inicio || null,
    horaFin: o.hora_fin || null,
    horasSemana: o.horas_semana || o.horasSemana || null,
    dias: o.dias_semana || o.dias || '',
    color: o.color || '#1e3c72',
    horarios: Array.isArray(o.horarios) ? o.horarios : [],
    grupos: [grupo],
    // keep raw for admin if needed
    raw: {
      profesor_id: o.profesor_id,
      cupo_maximo: cupo,
      precio: o.precio,
      rango_edad: o.rango_edad,
    },
  };
}

module.exports = { toClaseView };
