import NotFoundException from './NotFoundException';

export default class InviteNotFoundException extends NotFoundException {
  constructor(message) {
    super(message, 'Not Found', 404);
  }
}
