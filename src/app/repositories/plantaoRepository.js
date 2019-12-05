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
            .findOne({ name }, 'name farmacias escala')
            .populate('farmacias', 'name endereco telefone');
        return res;

    } catch (err) {
        return ({ error: 'Error cannot find plantão by name' })
    }
}

exports.findOneUpdate = async (filter, update, config) => {
    try {
        const res = await Plantao
            .findOneAndUpdate(filter, update, config);
        return res;

    } catch (err) {
        return ({ error: 'Error trying to fiund and update' })
    }
}