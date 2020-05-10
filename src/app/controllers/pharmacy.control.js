const Repository = require('../repositories/pharmacy.repo')
const { isEmpty } = require('../utils/scale.utils')

module.exports = {

  async getAll(req, res, next) {
    try {
      const entries = await Repository.getAll()

      if (!isEmpty(entries)) return res.status(200).json(entries)

      res.status(400)
      throw new Error('Are we empty? 🤔')
    } catch (error) {
      return next(error)
    }
  },

  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const entries = await Repository.getById({ _id: id })
      if (!isEmpty(entries)) return res.status(200).json(entries)

      res.status(400)
      throw new Error(`No pharmacy found, probably id: ${id} did not match`)
    } catch (error) {
      return next(error)
    }
  },

  async getByName(req, res, next) {
    try {
      const { name } = req.params
      const entries = await Repository.getByName(name)

      if (!isEmpty(entries)) return res.status(200).json(entries)

      res.status(400)
      throw new Error('Name is correct?')
    } catch (error) {
      return next(error)
    }
  },

  async store(req, res, next) {
    try {
      const { name } = req.body

      let pharmacy = await Repository.getByName(name)

      if (!pharmacy) {
        pharmacy = await Repository.create(req.body)
        return res.status(200).json(pharmacy)
      }

      res.status(409)
      throw new Error('Wrong inputs, cannot store that data. Maybe already exists 😇')
    } catch (error) {
      return next(error)
    }
  },

  async edit(req, res, next) {
    try {
      const { name } = req.body

      const pharmacy = await Repository.getByName(name)

      if (isEmpty(pharmacy)) {
        res.status(400)
        throw new Error('Bad request! pharmacy do not exist')
      }

      const { ok } = await Repository.update({ name }, req.body)

      if (ok) {
        return res.status(200)
          .json(`Pharmacy ${name} updated successfully  ✅`)
      }

      res.status(409)
      throw new Error({ message: 'Wrong inputs, cannot edit that data. ☠️' })
    } catch (error) {
      return next(error)
    }
  },

  async destroy(req, res, next) {
    try {
      const { ok } = await Repository.destroy({ _id: req.params.id })

      if (ok) {
        return res.status(200)
          .json(`Good Bye Pharmacy _id: ${req.params.id}! We deleted ${ok} successfully 💣`)
      }
      res.status(409)
      throw new Error({ message: 'Wrong inputs, cannot delete that data. ☠️' })
    } catch (error) {
      return next(error)
    }
  },

}
