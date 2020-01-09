const Twit = require('twit');
require("dotenv").config();


exports.makeTweet = (tweet) => {

    const twitter = new Twit({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_SECRET_KEY,
        access_token: process.env.TOKEN,
        access_token_secret: process.env.TOKEN_SECRET
    });

    const message = {
        status: tweet
    }

    const tweeted = (err, data, response) => {
        if (err) {
            console.log('Something went wrong on tweets')
        }
        console.log('Twitter works!')
    }

    return twitter.post('statuses/update', message, tweeted)

}

