"use-strict";

const express = require('express');
const app = express();
const connector_discovery = require('./services/discovery');
//const feeds = require('./feeds');
const sls = require('serverless-http');





app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', true);



app.get('/', function(req, res) {
    connector_discovery(req, res);
   
});

app.get('/route1', function(req,res) {
    res.status(200).send("Route 1 working");
})


// app.post('/cards/request', function(req,res) {

//     const keywords = req.body.keyword;
//     const regex = /([#])\w+/gm;
//     let match1 = keywords.match(regex);

//     const regexexec = regex.exec(keywords);

//     console.log(`match is ${match1} and exec is ${regexexec} `);
//     let first = match1.toString().split(',')[0];
  
//         const res1 = feeds.getTweets(first).then((data) => {
//        // console.log('success'+data);
//         res.json(data);
//     }).catch(err => {
//         console.log('error'+err);
//         res.json(err);
//     })
// })

module.exports.server = sls(app);

