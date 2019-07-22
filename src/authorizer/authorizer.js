"use-strict";

const jwt = require('jsonwebtoken');
const publicKey = require('./public-key');
let pubKey;

/**
 * Doc
 */
const extractTokenFromHeader = (e) => {
    if (e.authorizationToken && e.authorizationToken.split(' ')[0] === 'Bearer') {
        return e.authorizationToken.split(' ')[1];
    } else {
        return e.authorizationToken;
    }
};

/**
 * Doc
 * @param {*} token 
 */
const validateToken = (token) => {
    try {
        console.log('inside try');
        var decoded1 = jwt.decode(token, { complete: true });
        console.log('decode info =>'+JSON.stringify(decoded1));
        console.log(`pubkey is ${pubKey}`);
         let decoded = jwt.verify(token, pubKey);
           console.log('decoded',decoded);
           return true;
    } catch (error) {
        console.log('error=> ',error);
        return false;
    }
};

/**
 * Doc
 * @param {*} principalId 
 * @param {*} effect 
 * @param {*} resource 
 */
const generatePolicy = (principalId, effect, resource) => {
    var authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }

    return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.auth = async (event, context, callback) => {
     if(!pubKey) {
          await publicKey.getKey().then(data => {
            pubKey = data;
            console.log('public key =>',pubKey);
        }).catch(err => {
            console.log(err);
        })
     }
    
    console.log('called after key');
    let token = extractTokenFromHeader(event) || '';
    console.log('token-> ',token);
    const isValid = validateToken(token);
    console.log('is valid', isValid);
  
    if (isValid) {
        callback(null, generatePolicy('user', 'Allow', event.methodArn));
    } else {
        callback('Unauthorized');
    }
}

