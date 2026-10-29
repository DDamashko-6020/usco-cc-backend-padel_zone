'use strict';
const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/response');
function createCanchasController(svc) {
  return {
    list: asyncHandler(async (_req,res)=>success(res, await svc.list(), 'Canchas')),
    get: asyncHandler(async (req,res)=>success(res, await svc.getById(req.params.id), 'Cancha')),
    availability: asyncHandler(async (req,res)=>success(res, await svc.availability(req.params.id, req.query.fecha), 'Disponibilidad')),
    create: asyncHandler(async (req,res)=>success(res, await svc.create(req.body), 'Cancha creada', 201)),
    update: asyncHandler(async (req,res)=>success(res, await svc.update(req.params.id, req.body), 'Cancha actualizada')),
    remove: asyncHandler(async (req,res)=>success(res, await svc.remove(req.params.id), 'Cancha eliminada')),
  };
}
module.exports = { createCanchasController };
