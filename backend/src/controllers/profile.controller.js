'use strict';

const { asyncHandler } = require('../utils/asyncHandler');
const { success } = require('../utils/response');

function createProfileController(authService) {
  return {
    get: asyncHandler(async (req, res) => {
      const data = await authService.getProfile(req.user.id);
      return success(res, data, 'Perfil');
    }),
    patch: asyncHandler(async (req, res) => {
      const data = await authService.updateProfile(req.user.id, req.validated.body);
      return success(res, data, 'Perfil actualizado');
    }),
  };
}

module.exports = { createProfileController };
