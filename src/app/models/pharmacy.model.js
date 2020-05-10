const mongoose = require('../../database')

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  location: {
    lat: Number,
    lng: Number,
  },
})

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema)

module.exports = Pharmacy
