const Repository = require('../repositories/oncall.repo');
const { isEmpty } = require('../utils/scale.utils');
const { getFutureOnCallByPeriod } = require('../services/future');
const { checkScaleType } = require('../utils/scale.utils');
const { currentDayOfWeek } = require('../utils/date.utils');
require('dotenv').config();

const { API_KEY } = process.env;

module.exports = {

  async getAll(req, res, next) {
    try {
      const entries = await Repository.getAll();

      if (!isEmpty(entries)) return res.status(200).json(entries);

      res.status(400);
      throw new Error('Are we empty? 🤔');
    } catch (error) {
      return next(error);
    }
  },

  async getCurrent(req, res, next) {
    try {
      const entries = await Repository.getByStatus(checkScaleType(currentDayOfWeek()));

      if (!isEmpty(entries)) return res.status(200).json(entries);

      res.status(400);
      throw new Error('Cannot found current oncall, maybe status of today date is false? 🤔');
    } catch (error) {
      return next(error);
    }
  },

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const entries = await Repository.getById(id);

      if (!isEmpty(entries)) return res.status(200).json(entries);

      res.status(400);
      throw new Error(`No pharmacy found, probably id: ${id} did not match`);
    } catch (error) {
      return next(error);
    }
  },

  async getByName(req, res, next) {
    try {
      const { name } = req.params;
      const entries = await Repository.getByName(name);

      if (!isEmpty(entries)) return res.status(200).json(entries);

      res.status(400);
      throw new Error('Name is correct?');
    } catch (error) {
      return next(error);
    }
  },

  async store(req, res, next) {
    try {
      if (req.get('X-API-KEY') !== API_KEY) {
        res.status(401);
        throw new Error('UnAuthorized');
      }
      const { name } = req.body;

      let onCall = await Repository.getByName(name);

      if (!onCall) {
        onCall = await Repository.create(req.body);
        return res.status(200).json(onCall);
      }

      res.status(409);
      throw new Error('Wrong inputs, cannot store that data. Maybe already exists 😇');
    } catch (error) {
      return next(error);
    }
  },

  async edit(req, res, next) {
    try {
      if (req.get('X-API-KEY') !== API_KEY) {
        res.status(401);
        throw new Error('UnAuthorized');
      }

      const { name } = req.body;

      const onCall = await Repository.getByName(name);

      if (isEmpty(onCall)) {
        res.status(400);
        throw new Error('Bad request! on-call group do not exist');
      }

      const { _id } = onCall;
      const { ok } = await Repository.update({ _id }, req.body);

      if (ok) {
        return res.status(200)
          .json(`on-call Group ${name} updated ${ok} successfully  ✅`);
      }

      res.status(409);
      throw new Error({ message: 'Wrong inputs, cannot edit that data. ☠️' });
    } catch (error) {
      return next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      if (req.get('X-API-KEY') !== API_KEY) {
        res.status(401);
        throw new Error('UnAuthorized');
      }

      const { ok } = await Repository.destroy({ _id: req.params.id });

      if (ok) {
        return res.status(200)
          .json(`Good Bye Group _id: ${req.params.id}! We deleted ${ok} successfully 💣`);
      }

      res.status(409);
      throw new Error({ message: 'Wrong inputs, cannot delete that data. ☠️' });
    } catch (error) {
      return next(error);
    }
  },

  async future(req, res, next) {
    try {
      const { firstDate, secondDate } = req.body;
      const entries = await getFutureOnCallByPeriod(firstDate, secondDate);
      if (entries !== undefined) {
        return res.send(entries);
      }
      res.status(422);
      throw new Error(`Maybe Not future dates:  ${firstDate} - ${secondDate} 😟`);
    } catch (error) {
      return next(error);
    }
  },

};
