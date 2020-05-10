const mongoose = require('../../database')

const counterSchema = new mongoose.Schema({
  name: String,
  iterator: Number,
})
const Contador = mongoose.model('Counter', counterSchema)

module.exports = Contador
