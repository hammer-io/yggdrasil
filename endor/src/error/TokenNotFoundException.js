import NotFoundException from './NotFoundException';

export default class TokenNotFoundException extends NotFoundException {
  constructor(message) {
    super(message, 'Not Found', 401);
  }
}
