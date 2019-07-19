"use strict"

const feeds = require('./feeds');
// const constants = require('../utils/constant');
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')

const getResponse = (req, res) => {
    const keywords = req.body.keyword || req.body.tokens && req.body.tokens.keyword || "VMwareIndia";
    const routingPrefix = req.headers && req.headers['x-routing-prefix'] || req.headers['X-Routing-Prefix'];
    const query = Array.isArray(keywords) ? keywords[0] : keywords;
  
    const twitterCards = {objects: []};
    const hash = crypto.createHash('sha256')
    const baseURL = getBaseURL(req);

    feeds.getTweets(query).then((data) => {
       console.log(data);
       const tweet = data[0];
       const actions = getActions(routingPrefix, req, query, tweet);

       twitterCards.objects.push({ 
            id: uuidv4(),
            hash: hash.digest('base64'),
            image:  {
                href: `${baseURL}/images/twitter.png`
            },
            header: {
                title: `Tweet for #${query}`
            },
            body: {
                description: `${tweet.text}`,
                fields: [
                    {
                        type: 'GENERAL',
                        title: 'User',
                        description: `${tweet.user.name} @${tweet.user.screen_name}`
                    },                     
                    {
                        type: 'GENERAL',
                        title: 'Created at',
                        description: `${tweet.created_at}`
                    }, 
                ],
            },
            actions: actions,
        });
        res.json(twitterCards);
    }).catch(err => {
        console.log('error'+err);
        res.json(err);
    })    
};

/**
 * Function to get base URL
 */
const getBaseURL = (req) => {
    const headers = req.headers;
    const stage = req.baseUrl;
    const protocol = headers['x-forwarded-proto'] || 'http';
    const host = headers['host'] || 'localhost';
    const port = headers['x-forwarded-port'] || '';
    return (host === 'localhost') ? `${protocol}://${host}:${port}` : `${protocol}://${host}${stage}`;
};

/**
 * Doc
 * @param {*} prefix 
 * @param {*} req 
 * @param {*} query 
 */
const getActions = (prefix, req, query, tweet) => {
    const markAsFavourite = {
        id: uuidv4(),
        action_key: "DIRECT",
        label: "Like",
        completed_label: "Liked",
        url: {
            href: `${prefix}maskAsFavourite`
        },
        type: "POST",
        request: {
            tweet_id: tweet.id_str
        },
    };

    const openTweet = {
        id: uuidv4(),
        action_key: "OPEN_IN",
        label: "View Tweet",
        request: {},
        repeatable: true,
        type: "GET",
        url: {
            "href": `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
        }
    };

    const moreTweets = {
        id: uuidv4(),
        action_key: "USER_INPUT",
        label: "Get more Tweets",
        allow_repeated: true,
        url: {
            href: `${prefix}getMoreTweets`
        },
        type: "POST",
        request: {
            keyword: query
        },
        user_input: {
            id: "newKey",
            label: `Fetch tweet with ${query} and ...`
        }
    };

    return [
        openTweet,
        markAsFavourite,
        moreTweets, 
    ];
};

module.exports = {
    getResponse: getResponse,
};

