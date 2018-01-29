
export default class UnauthorizedException extends Error {
  constructor(message) {
    super(message);
    this.type = 'Unauthorized';
    this.status = 401;
    this.message = message;
  }
}
