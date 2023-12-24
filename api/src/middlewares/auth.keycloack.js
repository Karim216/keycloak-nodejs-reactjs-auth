const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `http://localhost:8080/realms/myrealm/protocol/openid-connect/certs`,
  }),
  // url: 'http://localhost:8080/',
  // realm: 'myrealm',
  // clientId: 'react-client',
  algorithms: ["RS256"],
});

module.exports = checkJwt;