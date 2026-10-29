'use strict';

const { z } = require('zod');

const registerBody = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  password: z.string().min(6).max(72),
  phone: z.string().trim().min(8).max(30).optional().or(z.literal('')),
}).strict();

const loginBody = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(72),
}).strict();

const patchProfileBody = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().email().max(120).optional(),
  phone: z.string().trim().min(8).max(30).optional(),
}).strict();

const registerSchema = z.object({ body: registerBody });
const loginSchema = z.object({ body: loginBody });
const patchProfileSchema = z.object({ body: patchProfileBody });

module.exports = { registerSchema, loginSchema, patchProfileSchema };
