const mongoose = require('mongoose')
require('dotenv').config()

const config = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
if (process.env.NODE_ENV !== 'development') {
  mongoose.connect(process.env.MONGO_URL, config, (error) => {
    if (error) console.log(error)

    console.log(`connection successful to mongoDB in ${process.env.NODE_ENV} mode`)
  })
} else {
  mongoose.connect(process.env.MONGO_URL, config, (error) => {
    if (error) console.log(error)

    console.log(`connection successful to mongoDB in ${process.env.NODE_ENV} mode`)
  })
}

module.exports = mongoose
