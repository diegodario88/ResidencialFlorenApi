const CounterModel = require('../models/counter.model')

const findById = async (id) => CounterModel.findById(id)
const update = async (conditions, doc) => CounterModel.updateOne(conditions, doc)

module.exports = {
  findById,
  update,
}
