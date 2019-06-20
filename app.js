"use-strict";

const express = require('express');
const app = express();
const connector_discovery = require('./services/discovery');
const cardResponse = require('./services/cardResponse');
const sls = require('serverless-http');
const constant = require('./utils/constant');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', true);


// Discovery Handler
app.get('/', function(req, res) {
    console.log('called discovery');
    connector_discovery(req, res);
   
});

app.get('/route1', function(req,res) {
    console.log('calling route1');
    res.status(200).send("Route 1 working");
})


// Handle All Actions

app.post('/getMoreTweets', (req, res) => {
    console.log('Fetching Tweets with ....');
    console.log('req =>',req.body);
    res.status(200).send(`Fetching success with : ${req.body.newKey}`);
})


// Handle the End Point for cards request

app.post(`/${constant.endPointHref}`, function(req,res) {
    console.log('called cards request');
    cardResponse.getResponse(req,res);
})

// Package the express app in the serverless package to deploy it. In our case as AWS Lambda
module.exports.server = sls(app, {
    binary: ['image/*']
});

