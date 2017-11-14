import NotFoundException from './NotFoundException';

export default class UserNotFoundException extends NotFoundException {
  constructor(message) {
    super(message, 'Not Found', 404);
  }
}
