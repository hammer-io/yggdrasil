import { getActiveLogger } from '../utils/winston';

const log = getActiveLogger();

export default class NotFoundException {
  constructor(message, type, status) {
    this.message = message;
    this.type = type;
    this.status = status;
    log.error(message);
  }

  toString() {
    return `${this.type} ${this.status}: ${this.message}`;
  }
}
