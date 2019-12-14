const express = require('express');
const Plantao = require('../models/plantao')
const repository = require('../repositories/plantaoRepository')
const plantaoService = require('../services/plantaoService');
const googleService = require('../services/googleService')

const router = express.Router();

//Lista plantão atual
router.get('/atual', async (req, res) => {
    try {
        const data = await plantaoService.verificaPlantao();
        const next = await plantaoService.getByStatus();
        const geoLocalization =
            await googleService.geoLocalization(data.farmacias[0].endereco, data.farmacias[1].endereco);

        const plantaoAtual = new Plantao(data);
        plantaoAtual.farmacias[0].geoloc = geoLocalization[0].geometry.location;
        plantaoAtual.farmacias[0].place_id = geoLocalization[0].place_id;
        plantaoAtual.farmacias[1].geoloc = geoLocalization[1].geometry.location;
        plantaoAtual.farmacias[1].place_id = geoLocalization[1].place_id;

        res.status(200).send(plantaoAtual);

    } catch (err) {

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