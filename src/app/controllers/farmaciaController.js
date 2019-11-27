const express = require('express');
const Farmacia = require('../models/farmacia')
const authMiddleware = require('../middlewares/auth')

const router = express.Router();
router.use(authMiddleware);

//Lista todos
router.get('/', async (req, res) => {
    try {
        const listaFarmacia = await Farmacia.find();

        return res.send({ listaFarmacia });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading farmácias.' })
    }
});

//Lista pelo ID
router.get('/:farmaciaID', async (req, res) => {
    res.send({ id: req.userId });
});

//Registra um
router.post('/', async (req, res) => {

    try {
        const farmacia = await Farmacia.create(req.body);

        return res.send({ farmacia });

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new farmácia.' })
    }
});

//Altera um pelo ID
router.put('/:farmaciaID', async (req, res) => {
    res.send({ id: req.userId });
});

//Deleta pelo ID
router.delete('/:farmaciaID', async (req, res) => {
    res.send({ id: req.userId });
});

module.exports = app => app.use('/api/v1/farmacias', router);