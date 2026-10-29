'use strict';

const { Producto } = require('../models');
const { BaseRepository } = require('./BaseRepository');

class ProductoRepository extends BaseRepository {
  constructor() {
    super(Producto);
  }

  decrementStock(id, cantidad, session) {
    return this.model.findOneAndUpdate(
      { _id: id, stock: { $gte: cantidad } },
      { $inc: { stock: -cantidad } },
      { new: true, session },
    );
  }
}

module.exports = { ProductoRepository };
