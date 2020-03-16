const { Router } = require('express')
const RateLimt = require('express-rate-limit')
const MongoStore = require('rate-limit-mongo')
const Pharmacy = require('../models/farmacia')
const Repository = require('../repositories/onCall')
const onCallService = require('../services/onCall')
require('dotenv').config()

const { MONGO_URL } = process.env

const router = Router()

const rateLimitDelay = 10 * 1000
const limiter = new RateLimt({
  store: new MongoStore({
    uri: MONGO_URL,
    expireTimeMs: rateLimitDelay,
  }),
  max: 5,
  windowMs: rateLimitDelay,
})

router.get('/pharmacy', async (req, res, next) => {
  try {
    const entries = await Pharmacy.find()
    res.send(entries)
  } catch (error) {
    next(error)
  }
})

router.get('/plantoes', async (req, res, next) => {
  try {
    const entries = await Repository.get()
    res.send(entries)
  } catch (error) {
    next(error)
  }
})

router.get('/plantoes/atual', async (req, res, next) => {
  try {
    const entries = await onCallService.getCurrentGroup()
    res.send(entries)
  } catch (error) {
    next(error)
  }
})

router.get('/plantoes/:name', async (req, res, next) => {
  try {
    const entries = await Repository.getByName(req.params.name)
    res.send(entries)
  } catch (error) {
    next(error)
  }
})

module.exports = { router, limiter }
