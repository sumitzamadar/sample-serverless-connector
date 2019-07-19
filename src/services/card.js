"use strict"

const twitter = require('./twitter');
const uuidv4 = require('uuid/v4')
const crypto = require('crypto')

/**
 * Get card response
 * @param {*} req 
 * @param {*} res 
 */
const getResponse = (req, res) => {
    const keywords = req.body.keyword || req.body.tokens && req.body.tokens.keyword || "VMwareIndia";
    const routingPrefix = req.headers && req.headers['x-routing-prefix'] || req.headers['X-Routing-Prefix'];
    const query = Array.isArray(keywords) ? keywords[0] : keywords;
  
    const twitterCards = {objects: []};
    const hash = crypto.createHash('sha256')
    const baseURL = getBaseURL(req);

    twitter.getTweet(query).then((data) => {
       console.log(data);
       const tweet = data[0];
       const actions = getActions(routingPrefix, req, query, tweet);

       twitterCards.objects.push({ 
            id: uuidv4(),
            name: 'Twitter',
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
                        description: `${tweet.user.name} (@${tweet.user.screen_name})`
                    },                     
                    {
                        type: 'GENERAL',
                        title: 'Created at',
                        description: tweet.created_at
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
    const open = {
        id: uuidv4(),
        action_key: "OPEN_IN",
        label: "View Tweet",
        completed_label: "View Tweet",
        request: {},
        primary: true,
        repeatable: true,
        type: "GET",
        url: {
            "href": `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        }
    };

    const like = {
        id: uuidv4(),
        action_key: "DIRECT",
        label: "Like",
        completed_label: "Liked",
        url: {
            href: `${prefix}card/actions/like`,
        },
        type: "POST",
        request: {
            tweet_id: tweet.id_str,
        },
    };

    const retweet = {
        id: uuidv4(),
        action_key: "DIRECT",
        label: "Retweet",
        completed_label: "Retweeted",
        allow_repeated: false,
        type: "POST",
        url: {
            href: `${prefix}card/actions/retweet`,
        },
        request: {
            tweet_id: tweet.id_str
        },
    };

    const reply = {
        id: uuidv4(),
        action_key: "DIRECT",
        label: "Reply",
        completed_label: "Reply",
        allow_repeated: true,
        type: "POST",
        url: {
            href: `${prefix}card/actions/reply`,
        },
        request: {
            tweet_id: tweet.id_str,
            author_name: tweet.user.screen_name,
        },
        user_input: [
            {
              "id": "reply_text",
              "label": "Tweet your reply",
            },
        ]    
    };


    return [open, like, retweet, reply];
};

// Export
module.exports = {
    getResponse: getResponse,
};

