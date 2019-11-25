const mongoose = require('mongoose');
const florenConnection = 'mongodb://172.17.0.2:27017/floren';

const config = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(florenConnection, config);

module.exports = mongoose;