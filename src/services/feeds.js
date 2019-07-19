"use strict"

const config = {
};

const Twitter = require('twitter');
const twitterClient = new Twitter(config);

/**
 * Function to tweets for the query string
 * @param {string} query 
 */
const getTweets = (query) => {
    const params = {q: query, count: 1};
    return new Promise( (resolve, reject) => {
        twitterClient.get('search/tweets/', params, (error, data, response) => {
            if (!error) {
                var statuses = data.statuses;
                return resolve(statuses);
            } else {
                console.log(error);
                reject(error);
            }
        })
    });
};

/**
 * Function to mark a tweet as liked 
 * @param {string} tweet_id 
 */
const markTweetAsFavoirite = (tweet_id) => {
    const params = {id: tweet_id};
    return new Promise( (resolve, reject) => {
        twitterClient.post('favorites/create/', params, (error, data, response) => {
            if (!error) {
                return resolve(data);
            } else {
                console.log(error);
                reject(error);
            }
        })
    });
};

module.exports = {
    getTweets : getTweets,
    markTweetAsFavoirite: markTweetAsFavoirite,
};