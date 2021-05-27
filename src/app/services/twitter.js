/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const Twitter = require('twitter');
require('dotenv').config();

exports.makeTweet = () => new Promise((resolve, reject) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token_key: process.env.TOKEN,
    access_token_secret: process.env.TOKEN_SECRET,
  });

  const data = require('fs').readFileSync('/tmp/floren.png');

  try {
    client.post('media/upload', { media: data }, (error, media, response) => {
      if (!error) {
        const status = {
          status: '📢 Plantão hoje #FlorenApp',
          media_ids: media.media_id_string,
        };

        client.post('statuses/update', status, (error, tweet, response) => {
          if (!error) {
            console.log('Twitter works! 🐦');
            resolve();
          } else { throw error; }
        });
      } else {
        throw error;
      }
    });
  } catch (error) {
    reject(error);
  }
});
