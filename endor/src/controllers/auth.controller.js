import passport from 'passport';
import oauth2orize from 'oauth2orize';

import { BasicStrategy } from 'passport-http';
import BearerStrategy from 'passport-http-bearer';

let clientService = {};
let authService = {};
let userService = {};
const server = oauth2orize.createServer();

const TOKEN_LENGTH = 256;

passport.use('basic', new BasicStrategy('basic', (username, password, next) => {
  userService.getCredentialsByUsername(username, password)
    .then(user => next(null, user)).catch((err) => {
      if (err.status === 404) {
        return next(null, false);
      }
      return next(err);
    })
}));

passport.use('client-basic', new BasicStrategy('client-basic', (username, password, next) => {
  clientService.findOneClientByClientId(username)
    .then((client) => {
      if (!client || client.secret !== password) {
        return next(null, false);
      }
      return next(null, client);
    })
    .catch((err) => {
      if (err.status === 404) {
        return next(null, false);
      }
      return next(err);
    });
}));


passport.use(new BearerStrategy('bearer', (accessToken, next) => {
  authService.findOneTokenByValue(accessToken)
    .then((foundToken) => {
      userService.getUserByIdOrUsername(foundToken.userId)
        .then((user) => {
          if (!user) {
            return next(null, false);
          }
          return next(null, user, { scope: '*' });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err))
}));

// Register serialization function - for sessions
server.serializeClient((client, next) => next(null, client.id), null);

// Register deserialization function
server.deserializeClient((id, next) => {
  clientService.findOneClientById(id)
    .then(client => next(null, client))
    .catch(err => next(err));
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, next) => {
  authService.createCode(client, redirectUri, user)
    .then(code => next(null, code.value))
    .catch(err => next(err));
}));

// Exchange authorization codes
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, next) => {
  authService.findOneCodeByValue(code)
    .then((authCode) => {
      if (authCode.clientIdId !== client.id) {
        console.log(authCode.clientIdId);
        console.log(client.id);
        return next(null, false);
      }
      if (redirectUri !== authCode.redirectURI) {
        console.log(redirectUri);
        console.log(authCode.redirectURI);
        return next(null, false);
      }

      const { clientIdId, userId } = authCode;
      console.log(`${clientIdId} ${userId}`);
      authService.deleteCode(code)
        .then(() => {
          authService.createToken(clientIdId, userId, TOKEN_LENGTH)
            .then(newToken => next(null, newToken))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
}));

export function success(req, res, next) {
  res.send({ code: req.query.code });
}

export function authorization() {
  console.log('Entered authorization function');
  return [
    server.authorization((clientId, redirectUri, next) => {
      clientService.findOneClientByClientId(clientId)
        .then(client => next(null, client, redirectUri))
        .catch((err) => { next(err); })
    }),
    (req, res) => {
      res.send({
        transactionID: req.oauth2.transactionID,
        user: req.user,
        client: req.oauth2.client
      });
    }
    // TODO Here it wants to ask for a permission
  ]
}

export function decision() {
  return [server.decision()];
}

export function token() {
  return [
    server.token()
  ]
}

export function setDependencies(newUserService, newClientService, newAuthService) {
  userService = newUserService;
  clientService = newClientService;
  authService = newAuthService;
}

exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
exports.isAuthenticated = passport.authenticate(['bearer', 'basic', 'client-basic'], { session: false });
