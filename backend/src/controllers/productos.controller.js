'use strict';
const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/response');
function createProductosController(svc) {
  return {
    list: asyncHandler(async (_req,res)=>success(res, await svc.list(), 'Productos')),
    get: asyncHandler(async (req,res)=>success(res, await svc.getById(req.params.id), 'Producto')),
    create: asyncHandler(async (req,res)=>success(res, await svc.create(req.body), 'Producto creado', 201)),
    update: asyncHandler(async (req,res)=>success(res, await svc.update(req.params.id, req.body), 'Producto actualizado')),
    remove: asyncHandler(async (req,res)=>success(res, await svc.remove(req.params.id), 'Producto eliminado')),
  };
}
module.exports = { createProductosController };
