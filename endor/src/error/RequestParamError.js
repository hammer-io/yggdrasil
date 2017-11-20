export default class RequestParamError {
  /**
   * The requrest param error constructor
   * @param field the field the error occurred in
   * @param message the message for the error
   */
  constructor(field, message) {
    this.field = field;
    this.message = message;
  }
}

