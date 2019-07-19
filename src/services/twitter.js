"use strict"

const config = {
    "consumer_key": 'vkbPZr8s1oxNuEfjCQKZalGtk',
    "consumer_secret": 'pkbkLLt0ByVUppiuxAZkhbdWK9JQwoweA9MmCxFhw9NyhPIOKU',
    "access_token_key" : '59386583-ZemSNv2sHETuOtCdp1LTu6wK7cA9zf3LGD4UgoMzp',
    "access_token_secret" : '9755RmIV4yQ4y07hbDHOtXnclbplgan7fkptZUMAe3t1Q'
};

const Twitter = require('twitter');
const twitterClient = new Twitter(config);

/**
 * Function to get a single tweet for the query string
 * @param {string} query 
 */
const getTweet = (query) => {
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
const likeTweet = (tweet_id) => {
    const params = {id: tweet_id};
    return new Promise( (resolve, reject) => {
        twitterClient.post('favorites/create', params, (error, data, response) => {
            if (!error) {
                return resolve(data);
            } else {
                console.log(error);
                reject(error);
            }
        })
    });
};

/**
 * Function to re-tweet 
 * @param {string} tweet_id 
 */
const reTweet = (tweet_id) => {
    const params = {id: tweet_id, trim_user: true};
    return new Promise( (resolve, reject) => {
        twitterClient.post('statuses/retweet/'+tweet_id, params, (error, data, response) => {
            if (!error) {
                return resolve(data);
            } else {
                console.log(error);
                reject(error);
            }
        })
    });
};

/**
 * Doc
 */
const replyTweet = (tweet_id, reply_text, author_name) => {
    const params = {status: reply_text +' @'+author_name, in_reply_to_status_id: tweet_id};
    return new Promise( (resolve, reject) => {
        twitterClient.post('statuses/update', params, (error, data, response) => {
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
    getTweet : getTweet,
    likeTweet: likeTweet,
    reTweet: reTweet,
    replyTweet: replyTweet,
};