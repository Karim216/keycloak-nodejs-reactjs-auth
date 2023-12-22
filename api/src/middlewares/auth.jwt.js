const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: 'https://node-api/',
  issuerBaseURL: 'https://dev-e6s0ch7ttbtt1yrl.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);
