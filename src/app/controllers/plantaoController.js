const express = require('express');
const Plantao = require('../models/plantao')
const authMiddleware = require('../middlewares/auth')

const router = express.Router();
router.use(authMiddleware);

//Lista todos
router.get('/', async (req, res) => {
    await Plantao
        .findOne({}, 'name farmacias escala')
        .populate('farmacias', 'name endereco telefone')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({ erro: 'Error loading plantões.', e })
        });
});

//Lista pelo ID/Name
router.get('/:name', async (req, res) => {
    await Plantao
        .findOne({ name: req.params.name }, 'name farmacias escala')
        .populate('farmacias', 'name endereco telefone')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({ erro: 'Error loading by id/name', e })
        });
});


module.exports = app => app.use('/api/v1/plantoes', router);