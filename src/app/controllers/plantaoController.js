const express = require('express');
const Plantao = require('../models/plantao');
const repository = require('../repositories/plantaoRepository');
const plantaoService = require('../services/plantaoService');
const router = express.Router();

//Lista plantão atual
router.get('/atual', async (req, res) => {
    try {
        const data = await plantaoService.verificaPlantao();
        const plantaoAtual = new Plantao(data);
        plantaoService.proximoPlantao(plantaoAtual);
        res.status(200).send(plantaoAtual);

    } catch (err) {
        console.log(err);

        res.status(500).send({ error: 'Error while loading plantão atual' })
    }
});


//Lista todos
router.get('/', async (req, res) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);

    } catch (err) {
        res.status(500).send({ error: 'Error while loading plantões' })

    }
});

//Lista pelo ID/Name
router.get('/:name', async (req, res) => {
    try {
        const data = await repository.getByName(req.params.name);

        res.status(200).send(data);


    } catch (err) {

        res.status(500).send({ error: 'Error while loading plantão by name' })
    }
});


module.exports = app => app.use('/api/v1/plantoes', router);