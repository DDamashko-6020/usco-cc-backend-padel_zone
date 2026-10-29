'use strict';

const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/response');

function createAuthController(authService) {
  return {
    register: asyncHandler(async (req, res) => {
      const data = await authService.register(req.validated.body);
      return success(res, data, 'Cuenta creada', 201);
    }),
    login: asyncHandler(async (req, res) => {
      const data = await authService.login(req.validated.body);
      return success(res, data, 'Sesión iniciada');
    }),
  };
}

module.exports = { createAuthController };
