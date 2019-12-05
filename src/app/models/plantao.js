const mongoose = require('../../database/index');

const plantaoScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    farmacias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmacia',
        required: true
    }],
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
