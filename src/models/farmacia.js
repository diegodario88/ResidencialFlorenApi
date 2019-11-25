const mongoose = require('mongoose');

const FarmaciaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    endereco: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        require: true
    },
    plantao: {
        type: Date,
        require: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Farmacia = mongoose.model('Farmacia', FarmaciaSchema);

module.exports = Farmacia;