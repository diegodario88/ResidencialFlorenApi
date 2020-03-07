/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const Twitter = require('twitter')
const data = require('fs').readFileSync('/tmp/floren.png', { encoding: 'base64' })
require('dotenv').config()

exports.makeTweet = async (altText) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TOKEN,
    access_token_secret: process.env.TOKEN_SECRET,
  })

  try {
    // Make post request on media endpoint. Pass file data as media parameter
    client.post('media/upload', { media: data }, (error, media, response) => {
      if (!error) {
        // If successful, a media object will be returned.
        console.log(media)

        // Lets tweet it
        const status = {
          status: altText,
          media_ids: media.media_id_string, // Pass the media id string
        }

        client.post('statuses/update', status, (error, tweet, response) => {
          if (!error) {
            console.log('Twitter works! 🐦')
          }
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}
