'use strict';

const mongoose = require('mongoose');
const { schemaOptions } = require('./_options');

const claseSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    tipo: { type: String },
    profesor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    rango_edad: { type: String, required: true },
    cupo_maximo: { type: Number, required: true },
    precio: { type: Number, required: true },
    duracion_clase: { type: Number },
    horas_semana: { type: Number },
    dias_semana: { type: String },
    color: { type: String },
    imagen_url: { type: String },
    horarios: { type: [String], default: undefined },
  },
  schemaOptions('clases'),
);

module.exports = mongoose.models.Clase || mongoose.model('Clase', claseSchema);
