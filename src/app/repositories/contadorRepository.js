'use strict';
const Contador = require('../models/contador')

//Encontra o contador pelo tipo
exports.findById = async (id) => {
    try {
        const result = await Contador.findOne({ _id: id });
        return result;

    } catch (err) {
        return ({ error: 'Errei aqui. Não consegui encontrar nenhum contador pelo id.' });
    }
}

//Atualiza o contador
exports.updateContador = async (filter, update, config) => {
    try {
        await Contador
            .updateOne(filter, update, config);

        return console.warn('YES! Sucesso no update do contador ... !');

    } catch (err) {
        console.log(err);
        return ({ error: 'OPA! OPA! deu ruim no update do contador.' })
    }
}