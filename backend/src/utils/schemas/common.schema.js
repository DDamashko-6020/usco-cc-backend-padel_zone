'use strict';

const { z } = require('zod');
const { isObjectId } = require('../objectId');

const objectId = z.string().refine(isObjectId, 'Identificador inválido');

const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
});

const horaHmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Hora inválida (HH:mm)');

const fechaIso = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida (YYYY-MM-DD)');

module.exports = { objectId, paginationQuery, horaHmm, fechaIso };
