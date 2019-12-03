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
    escala: {
        type: Date,
        require: false,
        default: Date.now
    }

});

const Plantao = mongoose.model('Plantao', plantaoScheme);

module.exports = Plantao;
