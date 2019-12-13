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
            .findOne({ name }, 'name farmacias status')
            .populate('farmacias', 'name endereco telefone');
        return res;

    } catch (err) {
        return ({ error: 'Error cannot find plantão by name' })
    }
}
exports.getByNumber = async (number) => {
    try {
        const res = await Plantao
            .findOne({}, 'name farmacias')
            .populate('farmacias', 'name endereco telefone')
            .where('numero').equals(number);
        return res;

    } catch (err) {
        return ({ error: 'Error cannot find plantão by name' })
    }
}

exports.updateDatePlantao = async (filter, update, config) => {
    try {
        await Plantao
            .updateOne(filter, update, config);
        return ({ success: 'Success' });

    } catch (err) {
        return ({ error: 'Error trying to update' })
    }
}

exports.findWhere = async () => {
    try {
        return await Plantao.findOne().where('status').equals('true');
    } catch (error) {
        return ({ error: 'Failure =(' })
    }
}