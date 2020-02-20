/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const Twit = require('twit')
const fs = require('fs')
require('dotenv').config()

exports.makeTweet = async (altText) => {
  const twitter = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TOKEN,
    access_token_secret: process.env.TOKEN_SECRET,
  })

  try {
    const b64content = fs.readFileSync('/tmp/floren.png', { encoding: 'base64' })
    // Upload Media
    const uploaded = (err, data, response) => {
      const mediaIdStr = data.media_id_string
      // eslint-disable-next-line camelcase
      const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      twitter.post('media/metadata/create', meta_params, (err, data, response) => {
        if (!err) {
          // Reference the media and post a tweet (media will attach to the tweet)
          const params = { status: '📢 Plantão hoje #FlorenAPI', media_ids: [mediaIdStr] }

          twitter.post('statuses/update', params, (err) => {
            if (err) throw new Error('😜', err)
            console.log('Twitter works! 🐦')
          })
        }
      })
    }

    twitter.post('media/upload', { media_data: b64content }, uploaded)
  } catch (error) {
    console.log(error)
  }
}
