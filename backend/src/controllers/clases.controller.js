'use strict';
const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/response');
function createClasesController(svc) {
  return {
    list: asyncHandler(async (_req,res)=>success(res, await svc.list(), 'Clases')),
    get: asyncHandler(async (req,res)=>success(res, await svc.getById(req.params.id), 'Clase')),
    enroll: asyncHandler(async (req,res)=>success(res, await svc.enroll(req.params.id, req.user.id, req.body), 'Inscripción creada', 201)),
    mine: asyncHandler(async (req,res)=>success(res, await svc.mine(req.user.id), 'Mis clases')),
    cancel: asyncHandler(async (req,res)=>success(res, await svc.cancel(req.params.enrollmentId, req.user.id), 'Inscripción cancelada')),
    create: asyncHandler(async (req,res)=>success(res, await svc.create(req.body), 'Clase creada', 201)),
    update: asyncHandler(async (req,res)=>success(res, await svc.update(req.params.id, req.body), 'Clase updated')),
    remove: asyncHandler(async (req,res)=>success(res, await svc.remove(req.params.id), 'Clase eliminada')),
  };
}
module.exports = { createClasesController };
