const fetch = require("node-fetch");

module.exports = {
    getKey : () => {
    const APIURL = process.env.PUBLIC_KEY || 'https://dev.hero.vmwservices.com/security/public-key';
   return new Promise((res,rej) => {
    fetchKeyFromAPI(APIURL).then((data) => {
        res(data);
    }).catch(err => {
        console.log('Failure in API Call -> '+err);
        rej(err);
    })
   }) 
}

}


function fetchKeyFromAPI(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then((data) => {
           return resolve(data.text());
        }).catch(err => {
            reject(err);
        });
    });
  
}