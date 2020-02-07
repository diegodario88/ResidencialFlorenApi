const mongoose = require('mongoose');
require("dotenv").config();

const config = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URL, config);
console.log('Connected to mongoDB!');


module.exports = mongoose;