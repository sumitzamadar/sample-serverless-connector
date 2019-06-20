const config = {
    "consumer_key": 'iriCOqsEYpwi2ad9Oxnb5GUEc',
    "consumer_secret": 'RIvtZN1jeGbkfYlOVnBT5DH7i56tY71GndAVMc9R2etZmAIf3F',
    "access_token_key" : '500666008-lYRReZMQwy7oiNEADVPNnbYT0vxvnKkHYjte656C',
    "access_token_secret" : 'sZk6NHlPfLOvPYINz2wvuGhfxi0pSHTUzBoNbxEzbfXkp'
};

const Twitter = require('twitter');
const client = new Twitter(config);

module.exports = {
    getTweets : (query) => {

        var params = { q: query, count: 1};

        var tweets;

        return new Promise( function( resolve, reject )
        {
            client.get('search/tweets/', params, function(error, tweets, response){
                if (!error) {
                    var statuses = tweets.statuses;
                    return resolve(statuses);
                }
                else{
                    console.log(error);
                    reject(error);
                }
            })
        });

    }
}