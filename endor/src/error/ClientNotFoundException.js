import NotFoundException from './NotFoundException';

export default class ClientNotFoundException extends NotFoundException {
  constructor(message) {
    super(message, 'Not Found', 404);
  }
}
