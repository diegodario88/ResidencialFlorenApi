
const onCall = require('../models/plantao')


exports.get = async () => {
  try {
    return await onCall.find({})
      .populate('farmacias', 'name endereco telefone location')
  } catch (error) {
    return console.error(error)
  }
}

exports.findByID = async (id) => {
  try {
    return await onCall.findOne({ _id: id })
      .populate('farmacias', 'name endereco telefone location')
  } catch (error) {
    return console.error(error)
  }
}

exports.getByName = async (name) => {
  try {
    return await onCall.findOne({ name })
      .populate('farmacias', 'name endereco telefone location')
  } catch (error) {
    return console.error(error)
  }
}
exports.getByNumber = async (number) => {
  try {
    return await onCall.findOne({})
      .populate('farmacias', 'name endereco telefone location')
      .where('numero').equals(number)
  } catch (error) {
    return console.error(error)
  }
}

exports.updateOnCall = async (filter, update) => {
  try {
    await onCall.updateOne(filter, update)
    return console.warn('Plantão updated succefully')
  } catch (error) {
    return console.error(error)
  }
}

exports.getByStatus = async (status) => {
  try {
    return await onCall.findOne()
      .populate('farmacias', 'name endereco telefone location')
      .where(`status${status}`).equals('true')
  } catch (error) {
    return console.error(error)
  }
}
