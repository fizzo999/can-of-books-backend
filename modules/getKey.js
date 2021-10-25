'use strict';

const jwksClient = require('jwks-rsa');

// this function comes directly from the jsonwebtoken docs
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard
  jwksUri: 'https://dev-wabzfy5s.us.auth0.com/.well-known/jwks.json',
});

// this function comes directly from the jsonwebtoken docs
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = getKey;
