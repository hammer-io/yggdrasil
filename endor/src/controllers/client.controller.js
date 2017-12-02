/* eslint-disable prefer-destructuring */
import { validationResult } from 'express-validator/check';
import * as responseHelper from '../utils/response-helper';
import * as errorFormatter from '../utils/error-formatter';

let clientService = {};

export async function createClient(req, res, next) {
  const userId = req.body.userId;
  const client = req.body.client;
  clientService.createClient(userId, client).then((createdClient) => {
    res.json(createdClient);
  }).catch((err) => {
    console.log(err);
    next(err);
  });
}

export async function getAllClients(req, res, next) {
  const userId = req.params.userId;
  clientService.findAllClients(userId).then((clients) => {
    res.send({ clients });
  }).catch((err) => {
    next(err);
  });
}


export function setDependencies(newClientService) {
  clientService = newClientService;
}
