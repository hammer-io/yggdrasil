import NotFoundException from './NotFoundException';

export default class ContributorNotFoundException extends NotFoundException {
  constructor(message) {
    super(message, 'Not Found', 404);
  }
}
