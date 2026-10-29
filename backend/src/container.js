'use strict';

const { createRepositories } = require('./repositories');
const { AuthService } = require('./services/AuthService');
const { CanchaService } = require('./services/CanchaService');
const { ClaseService } = require('./services/ClaseService');
const { ReservaService } = require('./services/ReservaService');
const { TorneoService } = require('./services/TorneoService');
const { ProductoService } = require('./services/ProductoService');
const { PedidoService } = require('./services/PedidoService');
const { UsuarioService } = require('./services/UsuarioService');
const { createAuthMiddleware } = require('./middlewares/auth');

function createContainer() {
  const repos = createRepositories();
  const services = {
    auth: new AuthService(repos.usuarios),
    canchas: new CanchaService(repos),
    clases: new ClaseService(repos),
    reservas: new ReservaService(repos),
    torneos: new TorneoService(repos),
    productos: new ProductoService(repos),
    pedidos: new PedidoService(repos),
    usuarios: new UsuarioService(repos),
  };
  const authMw = createAuthMiddleware(repos.usuarios);
  return { repos, services, authMw };
}

module.exports = { createContainer };
