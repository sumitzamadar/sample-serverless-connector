"use-strict";

const fetch = require("node-fetch");

/**
 * Doc
 * @param {*} url 
 */
const fetchKeyFromAPI = (url) => {
    console.log('fetch key from API called');
    return new Promise((resolve, reject) => {
        fetch(url).then((data) => {
           return resolve(data.text());
        }).catch(err => {
            reject(err);
        });
    });
};

/**
 * Doc
 */
const getKey = () => {
    const APIURL = process.env.PUBLIC_KEY || 'https://dev.hero.vmwservices.com/security/public-key';
    console.log('getKey called with APIURL =>'+APIURL);
    return new Promise((res,rej) => {
        fetchKeyFromAPI(APIURL).then((data) => {
            res(data);
        }).catch(err => {
            console.log('API call failed -> '+err);
            rej(err);
        })
    });
};


module.exports = {
    getKey : getKey,
}

