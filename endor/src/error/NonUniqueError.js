import { getActiveLogger } from '../utils/winston';

const log = getActiveLogger();

export default class NonUniqueError extends Error {
  /**
   * Non Unique Error - a wrapper class for SequelizeUniqueConstraintError with the sensitive
   * information removed.
   *
   * @param errors the list of errors that occurred on the request.
   * @param fields the field that already exists in the database.
   */
  constructor(errors, fields) {
    super();
    this.errors = [];
    errors.forEach(error => this.errors.push(error.message));
    this.type = 'NonUniqueError';
    this.fields = fields;
    this.status = 400;
    this.message = 'One or more fields were not unique';
    log.error(this.toString());
  }

  toString() {
    return `${this.type} ${this.status}: ${JSON.stringify(this.fields)} already exist(s)!`;
  }
}
