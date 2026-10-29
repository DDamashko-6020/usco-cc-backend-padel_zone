'use strict';

const { AppError } = require('../utils/AppError');
const { toProductoDTO } = require('../serializers/producto.serializer');

class ProductoService {
  constructor(repos) {
    this.productos = repos.productos;
  }

  async list() {
    const list = await this.productos.find({});
    return list.map(toProductoDTO);
  }

  async getById(id) {
    const p = await this.productos.findById(id);
    if (!p) throw new AppError('Producto no encontrado', 404);
    return toProductoDTO(p);
  }

  async create(data) { const p = await this.productos.insertOne(data); return toProductoDTO(p); }
  async update(id, data) { const p = await this.productos.updateById(id, data); if (!p) throw new AppError('Producto no encontrado', 404); return toProductoDTO(p); }
  async remove(id) { const p = await this.productos.deleteById(id); if (!p) throw new AppError('Producto no encontrado', 404); return { id: String(id) }; }
}

module.exports = { ProductoService };
