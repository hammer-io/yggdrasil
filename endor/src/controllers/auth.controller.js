import passport from 'passport';
import oauth2orize from 'oauth2orize';

import { BasicStrategy } from 'passport-http';
import BearerStrategy from 'passport-http-bearer';


let clientService = {};
let authService = {};
let userService = {};
const server = oauth2orize.createServer();
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
      if (redirectUri !== authCode.redirectURI) {
        return next(null, false);
      }

      const { userId } = authCode;
      authService.deleteCode(code)
        .then(() => {
          authService.createToken(userId, TOKEN_LENGTH)
            .then(newToken => next(null, newToken))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
}));

/**
 * Server's password for token exchange.  This method will be used if the grant_type is "password".
 * The username must first be converted into a userId for the function to operate.
 */
server.exchange(oauth2orize.exchange.password((client, username, password, scope, next) => {
  userService.getUserByIdOrUsername(username)
    .then((user) => {
      authService.createToken(user.id)
        .then(newToken => next(null, newToken))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}));

/**
 * Given a username, and password create a bare-bones user and a token for the new user.
 *
 * @param req the request
 * @param res the response
 * @param next the next middleware
 * @returns {Promise.<void>}
 */
export async function register(req, res, next) {
  const user = {
    username: req.body.username,
    email: req.body.email
  };
  try {
    const newUser = await userService.createUser(user, req.body.password, false);
    const newToken = await authService.createToken(newUser.id);
    res.send({ user: newUser, token: newToken });
  } catch (err) {
    next(err);
  }
}

/**
 * If the request gets this far, then return success because the token is valid.
 *
 * @param req the request
 * @param res the response
 * @returns {Promise.<void>}
 */
export async function checkToken(req, res) {
  res.status(200).send();
}

/**
 * A simple function used to return the access code to the client
 *
 * @param req the request
 * @param res the response
 */
export function success(req, res) {
  res.send({ code: req.query.code });
}

/**
 * Returns the server's authorization function
 *
 * @returns {[null,null]}
 */
export function authorization() {
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

/** Registering the authentication strategies with Passport */
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
exports.isAuthenticated = passport.authenticate(['bearer', 'basic'], { session: false });
/** Done Registering */
