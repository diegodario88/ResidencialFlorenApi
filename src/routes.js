/* eslint-disable consistent-return */
const { Router } = require('express');
const RateLimt = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const PharmaControl = require('./app/controllers/pharmacy.control');
const OnCallControl = require('./app/controllers/oncall.control');
require('dotenv').config();

const { MONGO_URL } = process.env;

const router = Router();

const rateLimitDelay = 10 * 1000;
const limiter = new RateLimt({
  store: new MongoStore({
    uri: MONGO_URL,
    expireTimeMs: rateLimitDelay,
  }),
  max: 30,
  windowMs: rateLimitDelay,
});

router.get('/pharmacies', PharmaControl.getAll);
router.get('/pharmacies/:id', PharmaControl.getOne);
router.get('/pharmacies/pharma/:name', PharmaControl.getByName);
router.post('/pharmacies', PharmaControl.store);
router.put('/pharmacies', PharmaControl.edit);
router.delete('/pharmacies/:id', PharmaControl.destroy);

router.get('/oncalls', OnCallControl.getAll);
router.get('/oncalls/today', OnCallControl.getCurrent);
router.get('/oncalls/:id', OnCallControl.getOne);
router.get('/oncalls/oncall/:name', OnCallControl.getByName);
router.post('/oncalls', OnCallControl.store);
router.put('/oncalls', OnCallControl.edit);
router.delete('/oncalls/:id', OnCallControl.destroy);
router.post('/oncalls/future', OnCallControl.future);

module.exports = { router, limiter };
