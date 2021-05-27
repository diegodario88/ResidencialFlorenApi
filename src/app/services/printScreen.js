/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const request = require('request');
const fs = require('fs');
require('dotenv').config();

exports.printScreen = () => new Promise((resolve, reject) => {
  try {
    request(
      {
        url: global.process.env.API_FLASH,
        encoding: 'binary',
        qs: {
          access_key: global.process.env.ACCESS_KEY,
          url: global.process.env.URL_DEST,
          fresh: true,
        },
      },
      (error, response, body) => {
        if (error) {
          throw new Error(error);
        } else {
          fs.writeFileSync('/tmp/floren.png', body, 'binary', (error) => {
            if (error) {
              reject();
            }
          });
          console.log('printService works! 😄');
        }
        resolve();
      },
    );
  } catch (error) {
    console.error('Error 🙃', error);
  }
});
