const mongoose = require('../../database');

const onCallScheme = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  pharmacies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacy',
    required: true,
  }],
  weekday: {
    status: Boolean,
    date: Date,
  },
  saturday: {
    status: Boolean,
    date: Date,
  },
  sunday: {
    status: Boolean,
    date: Date,
  },

});

const OnCall = mongoose.model('OnCall', onCallScheme);

module.exports = OnCall;
