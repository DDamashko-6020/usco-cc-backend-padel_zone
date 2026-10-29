'use strict';
const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/response');
function createTorneosController(svc) {
  return {
    list: asyncHandler(async (_req,res)=>success(res, await svc.list(), 'Torneos')),
    get: asyncHandler(async (req,res)=>success(res, await svc.getById(req.params.id), 'Torneo')),
    register: asyncHandler(async (req,res)=>success(res, await svc.register(req.params.id, req.user.id, req.body), 'Inscripción registrada', 201)),
    pay: asyncHandler(async (req,res)=>success(res, await svc.pay(req.params.participanteId, req.user.id), 'Pago confirmado')),
    mine: asyncHandler(async (req,res)=>success(res, await svc.mine(req.user.id), 'Mis inscripciones')),
    cancel: asyncHandler(async (req,res)=>success(res, await svc.cancel(req.params.participanteId, req.user.id), 'Inscripción cancelada')),
    create: asyncHandler(async (req,res)=>success(res, await svc.create(req.body), 'Torneo creado', 201)),
    update: asyncHandler(async (req,res)=>success(res, await svc.update(req.params.id, req.body), 'Torneo actualizado')),
    remove: asyncHandler(async (req,res)=>success(res, await svc.remove(req.params.id), 'Torneo eliminado')),
  };
}
module.exports = { createTorneosController };
