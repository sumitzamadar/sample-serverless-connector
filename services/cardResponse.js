const feeds = require('./feeds');
const constants = require('../utils/constant');
const uuidv1 = require('uuid/v1');

"use strict"

module.exports = {
    getResponse: (req,res) => {
 
        console.log('req',req);
        const keywords = req.body.keyword || req.body.tokens && req.body.tokens.keyword || "#VMware";
        console.log('keyword',keywords);
    
        let routingPrefix = req.headers && req.headers['x-routing-prefix'] || req.headers['X-Routing-Prefix'];
        console.log('routingPrefix',routingPrefix);
    

        let first = Array.isArray(keywords) ? keywords[0] : keywords;
      
            const res1 = feeds.getTweets(first).then((data) => {
           // console.log('success'+data);
           let objectsData = {};
           objectsData.objects = []; 

           let obj = { };
           obj.id= uuidv1();
           obj.templateHref = `${routingPrefix}templates/docs`;
           obj.body = data;

           obj.actions = getActions(routingPrefix, req, first);

           objectsData.objects.push(obj);
            res.json(objectsData);
        }).catch(err => {
            console.log('error'+err);
            res.json(err);
        })
    }
}

function getActions(routingPrefix, req, keyword) {
    let actions = {};
    actions.id = '';
    actions.action_key = "USER_INPUT";
    actions.label = "Get more Tweets";
    actions.completed_label = 'Success in fetch';
    actions.url ={
        href: `${routingPrefix}${constants.baseUrl}/getMoreTweets`
    } 
    actions.type= "POST";
    actions.request = {
        keyword: keyword
    }
    actions.user_input = {
        id: "newKey",
        label: 'Fetch tweet with ${keyword} and ...'
    }

    return actions;
}