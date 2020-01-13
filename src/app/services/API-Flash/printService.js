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
            fs.writeFile('src/app/services/API-Flash/floren.png', body, "binary", error => {
                console.log(error);
            });
        }
    })
}