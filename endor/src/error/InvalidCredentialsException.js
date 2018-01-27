import { getActiveLogger } from '../utils/winston';

const log = getActiveLogger();

export default class InvalidCredentialsException {
  constructor(message) {
    this.message = message;
    this.type = 'Invalid Credentials';
    this.status = 401;
    log.error(message);
  }

  toString() {
    return `${this.type} ${this.status} ${this.message}`;
  }
}
