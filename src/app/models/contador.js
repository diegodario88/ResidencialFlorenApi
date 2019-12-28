const mongoose = require('../../database');

const ContadorSchema = new mongoose.Schema({
    contadorSemanal: {
        type: Number,
        require: false
    },
    contadorSabadal: {
        type: Number,
        require: false
    },
    contadorDomingal: {
        type: Number,
        require: false
    }

});

const Contador = mongoose.model('Contador', ContadorSchema, 'Contadores', { versionKey: false });

module.exports = Contador;