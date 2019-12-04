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

exports.getByName = async (name) => {
    const res = await Plantao
        .findOne({ name }, 'name farmacias escala')
        .populate('farmacias', 'name endereco telefone');
    return res;
}