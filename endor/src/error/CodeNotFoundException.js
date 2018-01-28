import NotFoundException from './NotFoundException';

export default class CodeNotFoundException extends NotFoundException {
  constructor(message) {
    super(message, 'Forbidden', 403);
  }
}
