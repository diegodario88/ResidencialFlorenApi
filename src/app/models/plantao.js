const mongoose = require('../../database/index');


const plantaoScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    farmaciaPrincipal: {
        type: Number,
        required: true
    },
    farmaciaSecundaria: {
        type: Number,
        required: true
    },
    escala: {
        type: Date,
        require: false,
        default: Date.now
    }

});

const Plantao = mongoose.model('Plantao', plantaoScheme);

module.exports = Plantao;
