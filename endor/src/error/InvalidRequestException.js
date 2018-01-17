import { getActiveLogger } from '../utils/winston';

const log = getActiveLogger();

export default class InvalidRequestException {
  /**
   * The Invalid Request Exception
   * @param errors the list of errors that occurred on the request.
   */
  constructor(errors) {
    this.errors = errors;
    this.type = 'Invalid Request';
    this.status = 400;
    log.error(errors);
  }

  toString() {
    return `${this.type} ${this.status}: ${this.errors}`;
  }
}
