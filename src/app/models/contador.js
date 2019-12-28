const mongoose = require('../../database');

const ContadorSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: false
    },
    iterador: {
        type: Number,
        require: false
    },
    ciclo: {
        type: Number,
        require: false
    }

});

const Contador = mongoose.model('Contador', ContadorSchema, 'Contadores', { versionKey: false });

module.exports = Contador;