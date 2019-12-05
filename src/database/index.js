const mongoose = require('mongoose');
const db = require('../config/auth.json')
const florenConnection = db.connectionString || process.env.MONGO_URL;


const config = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(florenConnection, config);
console.log('Connected to mongoDB!');


module.exports = mongoose;