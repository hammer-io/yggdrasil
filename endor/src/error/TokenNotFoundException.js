import NotFoundException from './NotFoundException';

export default class TokenNotFoundException extends NotFoundException {
  constructor(message) {
    super(message, 'Forbidden', 403);
  }
}
