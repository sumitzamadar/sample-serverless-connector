const jwt = require('jsonwebtoken')
let pubKey;
require('./getPublicKey').getKey().then(data => {
    pubKey = data;
}).catch(err => {
    console.log(err);
})

//  Incase in future if we need this as 
//  a Lambda authorizer, we can use it as well

// exports.handler = (event, context, callback) => {
//     let token = extractTokenFromHeader(event) || '';
//     const isValid = validateToken(token);
//     if (isValid) {
//         callback(null, generatePolicy('user', 'Allow', event.methodArn));
//     } else {
//         callback('Unauthorized');
//     }

// }

module.exports =  {
    authenticateJwtToken : (event) => {
        let token = extractTokenFromHeader(event) || '';
        return validateToken(token);
        // const isValid = validateToken(token); 
    }
}

function extractTokenFromHeader(e) {
    if (e.authorizationToken && e.authorizationToken.split(' ')[0] === 'Bearer') {
        return e.authorizationToken.split(' ')[1];
    } else {
        return e.authorizationToken;
    }
}   

function validateToken(token) {
    jwt.verify(token, pubKey, function (error) {
        if (error) {
            return false;
        } else {
            return true;   
        }
    })
}

function generatePolicy (principalId, effect, resource) {
    var authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2019-06-01'; 
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    return authResponse;
}