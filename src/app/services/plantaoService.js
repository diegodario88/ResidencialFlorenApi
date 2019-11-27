const Farmacia = require('../models/farmacia');

exports.get = function (req, res) {

    Farmacia.find({}, function (err, data) {
        if (err) res.send(err);
        res.json(data);
    });
}



