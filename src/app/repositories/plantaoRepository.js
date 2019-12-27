'use strict';
const mongoose = require('../../database/index')
const Farmacias = require('../models/farmacia')
const Plantao = require('../models/plantao')

exports.get = async () => {
    try {
        const result = await Plantao
            .find({})
            .populate('farmacias', 'name endereco telefone');
        return result;

    } catch (error) {
        return ({ error: 'Errei aqui. Não consegui encontrar nenhum plantão!' });
    }
}

exports.findByID = async (id) => {
    try {
        const result = await Plantao
            .findOne({ _id: id })
            .populate('farmacias', 'name endereco telefone');
        return result;

    } catch (error) {
        return ({ error: 'UPS!, não consegui encontrar um plantão pelo filtro ID.' });
    }

}

exports.getOne = async (filter) => {
    try {
        const res = await Plantao
            .findOne({ name: filter })
            .populate('farmacias');
        return res;

    } catch (err) {
        return ({ error: 'UPS!, não consegui encontrar um plantão pelo filtro informado.' });
    }
}

exports.getByName = async (name) => {
    try {
        const res = await Plantao
            .findOne({ name })
            .populate('farmacias', 'name endereco telefone');
        return res;

    } catch (err) {
        return ({ error: 'Errei aqui. Não consegui encontrar nenhum plantão pelo nome.' });
    }
}
exports.getByNumber = async (number) => {
    try {
        const res = await Plantao
            .findOne({})
            .populate('farmacias', 'name endereco telefone')
            .where('numero').equals(number);
        return res;

    } catch (err) {
        return ({ error: 'Errei aqui. Não consegui encontrar nenhum plantão pelo número.' });
    }
}

exports.updatePlantao = async (filter, update, config) => {
    try {
        await Plantao
            .updateOne(filter, update, config);

        return console.warn('YES! Sucesso no update ... !');

    } catch (err) {
        console.log(err);

        return ({ error: 'OPA! OPA! deu ruim no update do plantão.' })
    }
}

exports.getByStatusSemanal = async () => {
    try {
        return await Plantao.findOne()
            .populate('farmacias', 'name endereco telefone')
            .where('statusSemanal').equals('true');
    } catch (error) {
        return ({ error: 'Errei aqui. Não consegui encontrar nenhum plantão pelo status Semanal.' });
    }
}

exports.getByStatusSabadal = async () => {
    try {
        return await Plantao.findOne()
            .populate('farmacias', 'name endereco telefone')
            .where('statusSabado').equals('true');
    } catch (error) {
        return ({ error: 'Errei aqui. Não consegui encontrar nenhum plantão pelo status Sabadal.' });
    }
}

exports.getByStatusDomingal = async () => {
    try {
        return await Plantao.findOne()
            .populate('farmacias', 'name endereco telefone')
            .where('statusDomingo').equals('true');
    } catch (error) {
        return ({ error: 'Errei aqui. Não consegui encontrar nenhum plantão pelo status Domingal.' });
    }
}