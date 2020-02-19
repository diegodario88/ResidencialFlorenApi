/* eslint-disable no-unused-vars */
const request = require('request')
const fs = require('fs')
require('dotenv').config()

exports.printScreen = () => {
  try {
    request(
      {
        url: global.process.env.API_FLASH,
        encoding: 'binary',
        qs: {
          access_key: global.process.env.ACCESS_KEY,
          url: global.process.env.URL_DEST,
        },
      },
      (error, response, body) => {
        if (error) throw new Error('Error 🙃', error)
        else {
          fs.writeFile('/tmp/floren.png', body, 'binary', (err) => {
            if (err) throw new Error('Error 🤓', error)
            console.log('printService works! 😄')
          })
        }
      },
    )
  } catch (error) {
    console.log(error)
  }
}
