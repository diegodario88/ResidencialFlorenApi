'use strict';
const express = require('express');
const Plantao = require('../models/plantao')
const repository = require('../repositories/plantaoRepository')

const router = express.Router();

//Lista todos
router.get('/', async (req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);

    } catch (e) {
        res.status(500).send({ error: 'Error while loading plantões', e })

    }
});

//Lista pelo ID/Name
router.get('/:name', async (req, res) => {
    try {
        var data = await repository.getByName(req.params.name);
        res.status(200).send(data);

    } catch (e) {
        res.status(500).send({ error: 'Error while loading plantão by name', e })
    }
});


module.exports = app => app.use('/api/v1/plantoes', router);