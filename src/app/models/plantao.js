const mongoose = require('../../database/');

const plantaoScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    numero: {
        type: Number,
        required: false
    },
    farmacias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmacia',
        required: true
    }],
    statusSemanal: {
        type: Boolean,
        required: false
    },
    statusSabado: {
        type: Boolean,
        required: false
    },
    statusDomingo: {
        type: Boolean,
        required: false
    },
    escalaSemanal: {
        type: Date,
        require: false,
    },
    escalaSabado: {
        type: Date,
        require: false,
    },
    escalaDomingo: {
        type: Date,
        require: false,
    }
});

const Plantao = mongoose.model('Plantao', plantaoScheme, 'Plantoes', { versionKey: false });

module.exports = Plantao;
