/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose')
require('dotenv').config()

const { MONGO_URL, MONGO_LOCAL_URL } = process.env

const config = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const handleConnection = async (url) => {
  try {
    mongoose.connect(url, config, (error) => {
      if (!error) {
        console.log(`connection successful to mongoDB in ${process.env.NODE_ENV} mode`)
      } else {
        throw error
      }
    })
  } catch (error) {
    console.error(error)
  }
}

process.env.NODE_ENV !== 'development' ? handleConnection(MONGO_URL)
  : handleConnection(MONGO_LOCAL_URL)


module.exports = mongoose
