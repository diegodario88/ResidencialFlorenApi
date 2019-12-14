const axios = require('axios')
require("dotenv").config();

exports.geoLocalization = async function (params) {
    try {
        const apiKey = process.env.API_KEY;
        const url = encodeURI(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${params},+Loanda+PR&key=${apiKey}`);

        const response = await axios.get(url);
        return response.data.results;

    } catch (err) {
        return ({ error: 'Geolocation error' })
    }

}

