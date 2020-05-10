const mongoose = require('mongoose')
require('dotenv').config()

const config = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
if (process.env.NODE_ENV !== 'development') mongoose.connect(process.env.MONGO_URL, config)
else { mongoose.connect(process.env.MONGO_LOCAL_URL, config) }
console.log(`Connected to mongoDB in ${process.env.NODE_ENV} mode.`)


module.exports = mongoose
