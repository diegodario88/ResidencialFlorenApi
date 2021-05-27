const mongoose = require('../../database');

const counterSchema = new mongoose.Schema({
  name: String,
  iterator: Number,
});
const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
