
let clientService = {};

/**
 * Create the client out of the information supplied in the req
 *
 * @param req the request
 * @param res the response
 * @param next the next middleware function
 * @returns {Promise.<void>}
 */
export async function createClient(req, res, next) {
  console.log(req.body.client);
  clientService.createClient(req.body.client).then((createdClient) => {
    res.json(createdClient);
  }).catch((err) => {
    next(err);
  });
}

/**
 * Fetch all the clients of a given user
 *
 * @param req the request
 * @param res the response
 * @param next the next middleware
 * @returns {Promise.<void>}
 */
export async function getAllClients(req, res, next) {
  clientService.findAllClients(req.params.userId).then((clients) => {
    res.send({ clients });
  }).catch((err) => {
    next(err);
  });
}

/**
 * Sets the services to be used by this controller
 * @param newClientService the ClientService
 */
export function setDependencies(newClientService) {
  clientService = newClientService;
}
