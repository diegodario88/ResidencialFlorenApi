'use strict';
const mongoose = require('../../database/index')
const Farmacias = require('../models/farmacia')
const Plantao = require('../models/plantao')

exports.get = async () => {
    const res = await Plantao
        .find({}, 'name farmacias escala')
        .populate('farmacias', 'name endereco telefone');
    return res;
}

exports.getOne = async (filter) => {
    try {
        const res = await Plantao
            .findOne({ name: filter })
            .populate('farmacias');
        return res;

    } catch (err) {
        return ({ error: 'Error cannot find plantão by filter' })
    }
}

exports.getByName = async (name) => {
    try {
        const res = await Plantao
            .findOne({ name })
            .populate('farmacias', 'name endereco telefone');
        return res;

    } catch (err) {
        return ({ error: 'Error cannot find plantão by name' })
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
        return ({ error: 'Error cannot find plantão by name' })
    }
}

exports.updatePlantao = async (filter, update, config) => {
    try {
        await Plantao
            .updateOne(filter, update, config);

        return console.warn('Sucesso no update');

    } catch (err) {
        console.log(err);

        return ({ error: 'Error trying to update' })
    }
}

exports.statusSemanal = async () => {
    try {
        return await Plantao.findOne().where('statusSemanal').equals('true');
    } catch (error) {
        return ({ error: 'Failure =(' })
    }
}

exports.statusSabadal = async () => {
    try {
        return await Plantao.findOne().where('statusSabado').equals('true');
    } catch (error) {
        return ({ error: 'Failure =(' })
    }
}

exports.statusDomingal = async () => {
    try {
        return await Plantao.findOne().where('statusDomingo').equals('true');
    } catch (error) {
        return ({ error: 'Failure =(' })
    }
}