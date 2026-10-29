'use strict';
const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/response');
function createUsuariosController(svc) {
  return {
    list: asyncHandler(async (_req,res)=>success(res, await svc.list(), 'Usuarios')),
    get: asyncHandler(async (req,res)=>success(res, await svc.getById(req.params.id), 'Usuario')),
    create: asyncHandler(async (req,res)=>success(res, await svc.create(req.body), 'Usuario creado', 201)),
    update: asyncHandler(async (req,res)=>success(res, await svc.update(req.params.id, req.body), 'Usuario actualizado')),
    remove: asyncHandler(async (req,res)=>success(res, await svc.remove(req.params.id), 'Usuario eliminado')),
  };
}
module.exports = { createUsuariosController };
