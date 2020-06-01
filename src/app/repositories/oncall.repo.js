const OncallModel = require('../models/oncall.model')

const create = async (document) => OncallModel.create(document)

const update = async (conditions, doc) => OncallModel
  .updateMany(conditions, doc)

const destroy = async (id) => OncallModel.deleteOne(id)

const getAll = async () => {
  const result = await OncallModel.find({})
    .populate('pharmacies')
  const sorted = result.sort((a, b) => a.number - b.number)
  return sorted
}

const getById = async (id) => OncallModel.findById(id)
  .populate('pharmacies')

const getByName = async (name) => OncallModel.findOne({ name })
  .populate('pharmacies')

const getByNumber = async (number) => OncallModel.findOne({ number })
  .populate('pharmacies')

const getByStatus = async (type) => OncallModel.findOne()
  .populate('pharmacies')
  .where(`${type}.status`).equals(true)

module.exports = {
  create,
  update,
  destroy,
  getAll,
  getById,
  getByName,
  getByNumber,
  getByStatus,
}
