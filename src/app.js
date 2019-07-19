"use-strict";

const express = require('express');
const app = express();
const discovery = require('./services/discovery');
const card = require('./services/card');
// const sls = require('serverless-http');
const constant = require('./utils/constant');
const feeds = require('./services/feeds');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', true);


// Discovery Handler
app.get('/', function(req, res) {
    discovery(req, res);
});

app.get('/route1', function(req, res) {
    res.status(200).send("Route 1 working");
})

// Handle All Actions
app.post('/getMoreTweets', (req, res) => {
    res.status(200).send(`Fetching success with : ${req.body.newKey}`);
})

app.post('/maskAsFavourite', (req, res) => {
    const tweet_id = req.body.tweet_id;
    feeds.markTweetAsFavoirite(tweet_id)
    .then((data) => {
        res.status(200).send('Tweet marked as favourite');
    })
    .catch((err) => {
        res.status(502).send('Failed');
    })
});

// Handle the End Point for cards request
app.post(`/${constant.endPointHref}`, function(req,res) {
    card.getResponse(req, res);
})

// // Package the express app in the serverless package to deploy it. In our case as AWS Lambda
// module.exports.server = sls(app, {
//     binary: ['image/*']
// });

module.exports = app;

