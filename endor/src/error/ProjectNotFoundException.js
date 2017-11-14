import NotFoundException from './NotFoundException';

export default class ProjectNotFoundException extends NotFoundException {
  constructor(message) {
    super(message, 'Not Found', 404);
  }
}
