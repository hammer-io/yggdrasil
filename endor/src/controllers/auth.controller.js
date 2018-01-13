import passport from 'passport';
import oauth2orize from 'oauth2orize';

import { BasicStrategy } from 'passport-http';
import BearerStrategy from 'passport-http-bearer';
import { getActiveLogger } from '../utils/winston';

let clientService = {};
let authService = {};
let userService = {};
const server = oauth2orize.createServer();
const log = getActiveLogger();
const TOKEN_LENGTH = 256;

/**
 * Instructions for passport to use a basic authentication.
 * Requires the user to supply their username and password.
 */
passport.use('basic', new BasicStrategy('basic', (username, password, next) => {
  userService.getCredentialsByUsername(username, password)
    .then(user => next(null, user)).catch((err) => {
      if (err.status === 404) {
        return next(null, false);
      }
      return next(err);
    })
}));

/**
 * Instructions for passport to use a basic authentication. Requires the client
 * of a user to supply their clientId (not id, this is like a username) and their
 * secret to authenticate the client.
 */
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

/**
 * Instructions for passport to use a bearer token authentication.  Requires the
 * user/client to supply their token in a header for access.
 */
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

/**
 * Registers the function to serialize the client for sessions on the auth server's side
 */
server.serializeClient((client, next) => next(null, client.id), null);

/**
 * Registers the the function to deserialize the client for sessions on the auth server's side
 */
server.deserializeClient((id, next) => {
  clientService.findOneClientById(id)
    .then(client => next(null, client))
    .catch(err => next(err));
});

/**
 * The server's function to generate new access codes for a client.
 */
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, next) => {
  authService.createCode(client.id, redirectUri, user.id)
    .then(code => next(null, code.value))
    .catch(err => next(err));
}));

// Exchange authorization codes
/**
 * The server's function to exchange an access code for a token. If the access code exists,
 * and it's clientId is the same as the client asking, and the redirectURI is the same as the
 * one stored, then the access code is deleted and a new token is generated and stored.
 */
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, next) => {
  authService.findOneCodeByValue(code)
    .then((authCode) => {
      if (authCode.clientId !== client.id) {
        return next(null, false);
      }
      if (redirectUri !== authCode.redirectURI) {
        return next(null, false);
      }

      const { clientId, userId } = authCode;
      authService.deleteCode(code)
        .then(() => {
          authService.createToken(clientId, userId, TOKEN_LENGTH)
            .then(newToken => next(null, newToken))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
}));

/**
 * A simple function used to return the access code to the client
 *
 * @param req the request
 * @param res the response
 */
export function success(req, res) {
  res.send({ code: req.query.code });
}

export function authorization() {
  log.info('Entered authorization function');
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
  ]
}

/**
 * The auth server's decision function
 * @returns {[null]}
 */
export function decision() {
  return [server.decision()];
}

/**
 * The auth server's token function
 * @returns {[null]}
 */
export function token() {
  return [
    server.token()
  ]
}

/**
 * Sets the services to be used by the controller
 * @param newUserService the UserService
 * @param newClientService the ClientService
 * @param newAuthService the AuthService
 */
export function setDependencies(newUserService, newClientService, newAuthService) {
  userService = newUserService;
  clientService = newClientService;
  authService = newAuthService;
}

/** Registering the authentication strategies with Passpost */
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
exports.isAuthenticated = passport.authenticate(['bearer', 'basic', 'client-basic'], { session: false });
/** Done Registering */
