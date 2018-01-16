import { InviteStatus } from '../db/sequelize';

import InviteNotFoundException from '../error/InviteNotFoundException';
import InvalidRequestException from '../error/InvalidRequestException';
import RequestParamError from '../error/RequestParamError';

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

export default class InviteService {
  /**
   * Invite Service constructor
   * @param inviteRepository the invite repository to inject (most likely something from sequalize)
   * @param log the logger to inject
   */
  constructor(inviteRepository, log) {
    this.inviteRepository = inviteRepository;
    this.log = log;
  }


  /**
   * Returns true if the given status is a match to one of the possible enumerations
   * @param status the string to check
   * @returns {boolean} whether or not the string is a valid InviteStatus
   */
  static isValidInviteStatus(status) {
    const inviteStatusValues = Object.keys(InviteStatus).map(key => InviteStatus[key]);
    return inviteStatusValues.filter(value => value === status).length > 0;
  }


  /**
   * Validates a invite
   * @param invite the invite to validate
   * @param asNewInvite boolean indicates whether it should be validated
   *   as a new invite or as an update
   * @returns {Array} list of errors
   */
  static async validateInvite(invite, asNewInvite) {
    const errors = [];
    if (asNewInvite) {
      if (!('userInvitedId' in invite)) {
        errors.push(new RequestParamError('userInvitedId', 'User is required.'));
      }

      if (!('projectInvitedToId' in invite)) {
        errors.push(new RequestParamError('projectInvitedToId', 'Project is required.'));
      }
    } else if (!('status' in invite)) {
      errors.push(new RequestParamError('status', 'Status is required for invite updates.'));
    }

    if (invite.daysFromCreationUntilExpiration
      && !isNonNegativeInteger(invite.daysFromCreationUntilExpiration)) {
      errors.push(new RequestParamError('daysFromCreationUntilExpiration', 'Must be a non-negative integer.'));
    }

    if (invite.status && !InviteService.isValidInviteStatus(invite.status)) {
      const inviteStatusValues = Object.keys(InviteStatus).map(key => InviteStatus[key]);
      const enumValues = inviteStatusValues.join(', ');
      errors.push(new RequestParamError('status', `Must be one of the following: ${enumValues}`));
    }

    return errors;
  }

  /**
   * Gets a invite by the invite id
   * @param inviteId the invite id to find by
   * @returns {Object} the invite that was found
   */
  async getInviteById(inviteId) {
    this.log.info(`InviteService: find invite with id of ${inviteId}`);
    const inviteFound = await this.inviteRepository.findOne({
      where: {
        id: inviteId
      }
    });

    if (inviteFound === null) {
      throw new InviteNotFoundException(`Invite with ${inviteId} could not be found.`);
    }

    return inviteFound;
  }

  /**
   * Gets all invites for the given project
   * @param projectId the project id to find by
   * @returns {Object} the invite that was found
   */
  async getInvitesByProjectId(projectId) {
    this.log.info(`InviteService: find invite with project id of ${projectId}`);
    const invitesFound = await this.inviteRepository.findAll({
      where: {
        projectInvitedToId: projectId
      }
    });

    if (invitesFound === null) {
      throw new InviteNotFoundException(`Invites belonging to project ${projectId} could not be found.`);
    }

    return invitesFound;
  }

  /**
   * Gets all invites for the given user
   * @param userId the user id to find by
   * @returns {Object} the invite that was found
   */
  async getInvitesByUserId(userId) {
    this.log.info(`InviteService: find invite with user id of ${userId}`);
    const invitesFound = await this.inviteRepository.findAll({
      where: {
        userInvitedId: userId
      }
    });

    if (invitesFound === null) {
      throw new InviteNotFoundException(`Invites for user ${userId} could not be found.`);
    }

    return invitesFound;
  }

  /**
   * Creates a new invite
   * @param projectId the id of the project to which the user is being invited to
   * @param userId the id of the user being invited
   * @param daysUntilExpiration the number of days the invite will remain open before expiring
   * @returns {Object} the created invite
   */
  async createInvite(projectId, userId, daysUntilExpiration) {
    this.log.info(`InviteService: creating invite for user ${userId} to project ${projectId}`);

    const invite = {
      userInvitedId: userId,
      projectInvitedToId: projectId,
      status: InviteStatus.OPEN,
      daysFromCreationUntilExpiration: daysUntilExpiration
    };

    const errors = await InviteService.validateInvite(invite, true);
    if (errors.length !== 0) {
      throw new InvalidRequestException(errors);
    }

    return this.inviteRepository.create(invite);
  }

  /**
   * Updates an invite
   * @param inviteId the id of the invite to update
   * @param invite the updated invite information
   * @returns {Object} the updated invite
   */
  async updateInvite(inviteId, invite) {
    this.log.info(`InviteService: update invite ${inviteId}`);

    const errors = await InviteService.validateInvite(invite, false);
    if (errors.length !== 0) {
      throw new InvalidRequestException(errors);
    }

    const foundInvite = await this.getInviteById(inviteId);
    if (foundInvite === null) {
      throw new InviteNotFoundException(`Invite ${inviteId} not found.`);
    }

    return foundInvite.update(invite);
  }

  /**
   * Deletes an invite by the invite id
   * @param inviteId the invite id to delete by
   * @returns {Object} the invite that was deleted
   */
  async deleteInvite(inviteId) {
    this.log.info(`InviteService: delete invite with id ${inviteId}`);
    const inviteToBeDeleted = await this.getInviteById(inviteId);
    await inviteToBeDeleted.destroy();
    return inviteToBeDeleted;
  }
}
