const axios = require('axios')
require("dotenv").config();

exports.geoLocalization = async function (end1, end2) {
    try {
        const city = '+Loanda+PR+';
        const apiKey = process.env.API_KEY;
        const url = encodeURI(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${end1},${city}address=${end2},${city}&key=${apiKey}`);

        const response = await axios.get(url);

        return response.data.results;

    } catch (err) {
        console.log(err);

        return ({ error: 'Geolocation error' })
    }

}

