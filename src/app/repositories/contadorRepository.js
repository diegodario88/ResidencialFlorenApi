const Counter = require('../models/contador')

exports.findById = async (id) => {
  try {
    const result = await Counter.findOne({ _id: id })
    return result
  } catch (err) {
    console.error(err)
    return { error: 'Something went wrong finding counter by id' }
  }
}

exports.updateCounter = async (filter, update) => {
  try {
    await Counter.updateOne(filter, update)
    return console.warn('Counter updated succefully')
  } catch (err) {
    console.error(err)
    return { error: 'Something went wrong in updateCounter' }
  }
}
