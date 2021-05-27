const CounterModel = require('../models/counter.model');

const findById = async (id) => CounterModel.findOne({ _id: id });
const update = async (conditions, doc) => CounterModel.updateOne(conditions, doc);

module.exports = {
  findById,
  update,
};
