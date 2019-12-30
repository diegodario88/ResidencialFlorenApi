const express = require('express');
const Farmacia = require('../models/farmacia')

const router = express.Router();

//Lista todos
router.get('/', async (req, res) => {
    try {
        const listaFarmacia = await Farmacia.find();

        return res.send({ listaFarmacia });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading farmácias.' })
    }
});


module.exports = app => app.use('/api/v1/farmacias', router);