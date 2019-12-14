const mongoose = require('../../database');

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
    geoloc: {
        type: Object,
        require: false
    }

});

const Farmacia = mongoose.model('Farmacia', FarmaciaSchema, 'Farmacias', { versionKey: false });

module.exports = Farmacia;