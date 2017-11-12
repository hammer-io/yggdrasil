import { getActiveLogger } from '../utils/winston';

const log = getActiveLogger();

/**
 * Throw the not found response
 * @param res the response
 */
export function notFound(res) {
  res.status(404).send({ message: 'Not Found', status: 404 });
}

/**
 * Throw the interal error message
 * @param res the response
 * @param error the error that was thrown
 */
export function internalError(res, error) {
  log.error(error);
  res.status(500).send({ message: 'Internal Error', status: 500 });
}

/**
 * Throw the no content message. Typically used on successful deletions
 * @param res the response
 */
export function noContent(res) {
  res.status(204).send( {message: 'No Content', status: 204 });
}
