'use strict';

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  findById(id, projection) {
    return this.model.findById(id, projection);
  }

  findOne(filter, projection) {
    return this.model.findOne(filter, projection);
  }

  find(filter = {}, options = {}) {
    const q = this.model.find(filter);
    if (options.sort) q.sort(options.sort);
    if (options.skip) q.skip(options.skip);
    if (options.limit) q.limit(options.limit);
    if (options.projection) q.select(options.projection);
    return q;
  }

  count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  create(data, session) {
    const docs = Array.isArray(data) ? data : [data];
    const opts = session ? { session } : {};
    return this.model.create(docs, opts);
  }

  insertOne(data, session) {
    const opts = session ? { session } : {};
    return this.model.create([data], opts).then((r) => r[0]);
  }

  updateById(id, data, session) {
    return this.model.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true, session });
  }

  deleteById(id, session) {
    return this.model.findByIdAndDelete(id, { session });
  }
}

module.exports = { BaseRepository };
