/* eslint-disable no-unused-vars */
const request = require('request')
const fs = require('fs')
require('dotenv').config()

exports.printScreen = () => new Promise((resolve, reject) => {
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
        console.log('Error 🙃', error)
        reject()
      } else {
        fs.writeFileSync('/tmp/floren.png', body, 'binary', (err) => {
          if (err) {
            console.log('Error 🤓', err)
            reject()
          }
        })
        console.log('printService works! 😄')
      }
      resolve()
    },
  )
})
