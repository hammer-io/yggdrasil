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
  userService.getCredentialsByUsername(username, password).then((user) => {
    return next(null, user);
  }).catch((err) => {
    if (err.status === 404) {
      return next(null, false);
    }
    next(err);
  })
}));

passport.use('client-basic', new BasicStrategy('client-basic', (username, password, next) => {
  clientService.findOneClientById(username).then((client) => {
    if (!client || client.secret !== password) {
      return next(null, false);
    }
    return next(null, client);
  }).catch((err) => {
    if (err.status === 404){
      return next(null, false);
    }
    next(err);
  })
}));

// I think some of this chaining is janky revisit one done
passport.use(new BearerStrategy('bearer', (accessToken, next) => {
  authService.findOneTokenByValue(accessToken).then((foundToken) => {
    userService.getUserByIdOrUsername(foundToken.user).then((user) => {
      if (!user) {
        next(null, user, { scope: '*' });
      }
    });
  }).catch((err) => {
    next(err);
  })
}));

// Register serialization function - for sessions
server.serializeClient((client, next) => next(null, client.id), null);

// Register deserialization function
server.deserializeClient((id, next) => {
  clientService.findOneClientById(id).then((client) => {
    next(null, client);
  }).catch((err) => {
    next(err);
  })
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, next) => {
  authService.createCode(client, redirectUri, user).then((code) => {
    next(null, code);
  }).catch((err) => {
    next(err);
  })
}));

// Exchange authorization codes
server.exchange(oauth2orize.exchange.code((clientId, code, redirectUri, next) => {
  clientService.findOneClientById(clientId).then((client) => {
    authService.findOneCodeByValue(code).then((authCode) => {
      if (authCode.id !== client.id) {
        next(null, false);
      }
      if (redirectUri !== authCode.redirectUri) {
        next(null, false);
      }
    });

    authService.deleteCode(code).then((deletedCode) => {
      authService.createToken(deletedCode.clientId, deletedCode.userId, TOKEN_LENGTH)
        .then((newToken) => {
          next(null, newToken);
        })
    })
  }).catch((err) => {
    if (err.status === 404) {
      // Return false because the access code is not valid, but don't return the error
      next(null, false);
    } else {
      next(err);
    }
  })
}));

export function authorization() {
  return [
    server.authorization((clientId, redirectUri, next) => {
      clientService.findOneClientById(clientId)
        .then(client => next(null, client, redirectUri))
        .catch((err) => { next(err); })
    })
    // TODO Here it wants to ask for a permission
  ]
}

export function decision() {
  return [server.decision()];
}

export function token() {
  return [
    server.token(),
    server.errorHandler()
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
