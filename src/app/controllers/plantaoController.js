const express = require('express');
const Plantao = require('../models/plantao')
const Farmacia = require('../models/farmacia')
const authMiddleware = require('../middlewares/auth')
const PlantaoDTO = require('../models/DTO/plantaoDTO')



const router = express.Router();
router.use(authMiddleware);

//Lista todos
router.get('/', async (req, res) => {
    try {
        const listaPlantao = await Plantao.find();
        return res.send({ listaPlantao });

    } catch (err) {
        console.log(err);

        return res.status(400).send({ error: 'Error loading plantões.' })
    }
});

//Lista pelo ID
router.get('/:plantaoID', async (req, res) => {
    res.send({ id: req.userId });
});

//Registra um
router.post('/', async (req, res) => {
    try {
        const [name, farmaciaPrincipal, farmaciaSecundaria] = req.body;

        const principal = await Farmacia.find({ farmaciaPrincipal });
        const secundaria = await Farmacia.find({ farmaciaSecundaria });
        const plantao = new PlantaoDTO({ name, principal, secundaria });

        return res.send({ plantao });

    } catch (err) {
        console.log(err);

        return res.status(400).send({ error: 'Error creating new plantão.' })
    }
});

//Altera um pelo ID
router.put('/:plantaoID', async (req, res) => {
    res.send({ id: req.userId });
});

//Deleta pelo ID
router.delete('/:plantaoID', async (req, res) => {
    res.send({ id: req.userId });
});

module.exports = app => app.use('/api/v1/plantoes', router);