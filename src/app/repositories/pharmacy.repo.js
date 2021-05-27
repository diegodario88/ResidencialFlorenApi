const PharmaModel = require('../models/pharmacy.model');

const create = async (document) => PharmaModel.create(document);

const update = async (conditions, doc) => PharmaModel
  .updateOne(conditions, doc);

const destroy = async (id) => PharmaModel.deleteOne(id);

const getAll = async () => PharmaModel.find({});

const getById = async (id) => PharmaModel.findById(id);

const getByName = async (name) => PharmaModel.findOne({ name });

module.exports = {
  create,
  update,
  destroy,
  getAll,
  getById,
  getByName,
};
