"use-strict";

// Core modules
const path = require('path');

// Modules from `node_modules`
const express = require('express');

// Custom modules
const discovery = require('./services/discovery');
const card = require('./services/card');
const twitter = require('./services/twitter');

// Create express server
const app = express();

// Set public/static folder
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath));

// Handle request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', true);

// Discovery
app.get('', (req, res) => {
    const response = discovery(req, res);
    res.send(response);
});

// Card request
app.post('/cards/request', (req, res) => {
    card.getResponse(req, res);
});

// Card action -like a tweet
app.post('/actions/like', (req, res) => {
    const tweet_id = req.body.tweet_id;

    twitter.likeTweet(tweet_id)
    .then((data) => {
        res.status(200).send('Tweet liked.');
    })
    .catch((err) => {
        res.status(502).send(err.message ? err.message :  'Tweet like failed!');
    })
});

// Card action - re-tweet
app.post('/actions/retweet', (req, res) => {
    const tweet_id = req.body.tweet_id;

    twitter.reTweet(tweet_id)
    .then((data) => {
        res.status(200).send('Retweeted.');
    })
    .catch((err) => {
        res.status(502).send(err.message ? err.message :  'Retweet failed!');
    })
});

// Card action - reply tweet
app.post('/actions/reply', (req, res) => {
    const tweet_id = req.body.tweet_id;
    const reply_text = req.body.reply_text;
    const author_name = req.body.author_name;

    twitter.replyTweet(tweet_id, reply_text, author_name)
    .then((data) => {
        res.status(200).send('Tweet replied.');
    })
    .catch((err) => {
        res.status(502).send(err.message ? err.message :  'Tweet reply failed!');
    })
});


// Export
module.exports = app;

