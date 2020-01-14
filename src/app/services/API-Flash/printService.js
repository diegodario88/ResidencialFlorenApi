const request = require('request');
const fs = require('fs');
require("dotenv").config();

exports.printScrenn = () => {
    request({
        url: "https://api.apiflash.com/v1/urltoimage",
        encoding: "binary",
        qs: {
            access_key: process.env.access_key,
            url: "https://residencialfloren.firebaseapp.com/",
        }

    }, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            fs.writeFile('/tmp/floren.png', body, "binary", function (err, result) {
                if (err) console.log('error', err);
            });
        }
    })
}