import { getActiveLogger } from '../utils/winston';

const log = getActiveLogger();

export default class NonUniqueError {
  /**
   * Non Unique Error
   * @param errors the list of errors that occurred on the request.
   * @param field the field that already exists in the database.
   */
  constructor(errors, field) {
    this.errors = errors;
    this.type = '';
    this.field = field;
    this.status = 400;
    log.error(errors);
  }

  toString() {
    return `${this.type} ${this.status}: ${this.field} already exists!`;
  }
}
