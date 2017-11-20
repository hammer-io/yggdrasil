import ProjectNotFoundException from '../error/ProjectNotFoundException';

export default class ProjectService {
  /**
   * Project Service constructor
   * @param projectRepository the project data source to inject (more than likely something from
   * sequalize)
   * @param userService the user service to inject
   * @param log the logging mechanism to inject
   */
  constructor(projectRepository, userService, log) {
    this.userService = userService;
    this.projectRepository = projectRepository;
    this.log = log
  }

  /**
   * Gets all of the projects in the system
   * @returns all of the projects in the system
   */
  async getAllProjects() {
    this.log.info('ProjectService: find all projects');
    const projects = await this.projectRepository.findAll();
    return projects;
  }

  /**
   * Gets project by id
   * @param projectId the id to find by
   * @returns the project with the given id
   */
  async getProjectById(projectId) {
    this.log.info(`ProjectService: get project with id ${projectId}`);
    const project = await this.projectRepository.findById(projectId);
    if (project === null) {
      throw new ProjectNotFoundException(`Project with id ${projectId} not found`);
    }


    return project;
  }

  /**
   * Gets the contributors for a project
   * @param projectId the project id to get contributors for
   * @returns {Array} the project contributors
   */
  async getContributorsByProjectId(projectId) {
    this.log.info(`ProjectService: get contributors for project with id ${projectId}`);
    const project = await this.getProjectById(projectId);
    const contributors = await project.getContributors();
    return contributors;
  }

  /**
   * Gets the owners for a project
   * @param projectId the project id to get the owners for
   * @returns {Array} the project owners
   */
  async getOwnersByProjectId(projectId) {
    this.log.info(`ProjectService: get owners for project with id ${projectId}`);
    const project = await this.getProjectById(projectId);
    const owners = await project.getOwners();
    return owners;
  }

  /**
   * Finds projects for a user
   * @param user the userId to find by
   * @returns the projects for the user separated by owned and contributed
   */
  async getProjectsByUser(user) {
    this.log.info(`ProjectService: get projects for user ${user}`);
    const userFound = await this.userService.getUserByIdOrUsername(user);

    const projectsOwned = await userFound.getProjectsOwned();
    const projectsContributed = await userFound.getProjectsContributed();

    const projects = {};
    projects.owned = projectsOwned;
    projects.contributed = projectsContributed;

    return projects;
  }

  /**
   * Checks if a user is a contributor on a project
   *
   * @param projectId the project id
   * @param user the user id or username to check
   * @returns {Boolean} true if the user is a contributor, false if not
   */
  async checkIfUserIsContributorOnProject(projectId, user) {
    this.log.info(`ProjectServiceL check if user ${user} is an contributor on project with id ${projectId}`);
    const projectContributors = await this.getContributorsByProjectId(projectId);
    const filteredContributors = projectContributors.filter(userObject =>
      userObject.id === parseInt(user, 10) || userObject.username === user);

    return filteredContributors.length > 0;
  }

  /**
   * Checks if a user is an owner on a project
   * @param projectId the project id
   * @param user the user id or username to check
   * @returns {Boolean} true if the user is a owner, false if not
   */
  async checkIfUserIsOwnerOnProject(projectId, user) {
    this.log.info(`ProjectServiceL check if user ${user} is an owner on project with id ${projectId}`);
    const projectOwners = await this.getOwnersByProjectId(projectId);
    const filteredOwners = projectOwners.filter(userObject =>
      userObject.id === parseInt(user, 10) || userObject.username === user);

    return filteredOwners.length > 0;
  }

  /**
   * Creates a new project
   *
   * @param project the values of the project
   * @param user the user id or username of the user creating the project
   * @returns the created project if successful, null otherwise
   */
  async createProject(project, user) {
    this.log.info(`ProjectService: create project for user ${user}`);
    const userFound = await this.userService.getUserByIdOrUsername(user);

    // create
    const projectCreated = await this.projectRepository.create(project);
    await projectCreated.addOwners(userFound);

    return projectCreated;
  }

  /**
   * Adds a contributor to a project
   * @param projectId the project id for the project
   * @param user the user to add as a contributor
   * @returns {Array} the list of contributors after the addition
   */
  async addContributorToProject(projectId, user) {
    this.log.info(`ProjectService: adding user ${user} as an contributor to project with id ${projectId}`);
    const userFound = await this.userService.getUserByIdOrUsername(user);

    const project = await this.getProjectById(projectId);
    await project.addContributors(userFound);
    const contributors = project.getContributors();
    return contributors;
  }

  /**
   * Adds an owner to a project
   * @param projectId the project id for the project
   * @param user the user to add as a contributor
   * @returns {Array} the list of contributors after the addition
   */
  async addOwnerToProject(projectId, user) {
    this.log.info(`ProjectService: adding user ${user} as an owner to project with id ${projectId}`);
    const userFound = await this.userService.getUserByIdOrUsername(user);

    const project = await this.getProjectById(projectId);
    await project.addOwners(userFound);
    const contributors = project.getOwners();
    return contributors;
  }

  /**
   * Updates an existing project
   * @param project the project values
   * @param projectId the project id to update
   * @returns the updated project if it was updated, null otherwise.
   */
  async updateProject(project, projectId) {
    this.log.info(`ProjectService: update project with id ${projectId}`);
    if (projectId) {
      const foundProject = await this.projectRepository.findById(projectId);
      if (foundProject === null) {
        throw new ProjectNotFoundException(`Project with id ${projectId} not found`);
      }

      const projectUpdated = await foundProject.update(project);
      return projectUpdated;
    }

    return null;
  }


  /**
   * Soft deletes a project by id
   * @param projectId project id
   * @param isForceDelete determines if it should be soft deleted or hard deleted
   * @returns the project that was deleted
   */
  async deleteProjectById(projectId, isForceDelete) {
    this.log.info(`ProjectService: delete project with id ${projectId}`);
    const project = await this.projectRepository.findById(projectId);
    if (project === null) {
      throw new ProjectNotFoundException(`Project with id ${projectId} not found`);
    }

    await project.destroy({ force: isForceDelete });
    return project;
  }

  /**
   * Removes a user as a contributor from a project
   * @param projectId the project to remove the contributor from
   * @param user the user to remove
   * @returns {Array} the contributors of that project after deletion
   */
  async deleteContributorFromProject(projectId, user) {
    this.log.info(`ProjectService: delete contributor ${user} from project with id ${projectId}`);
    const project = await this.getProjectById(projectId);

    const userFound = await this.userService.getUserByIdOrUsername(user);

    await project.removeContributors(userFound);
    return project.getContributors();
  }

  async deleteOwnerFromProject(projectId, user) {
    this.log.info(`ProjectService: delete contributor ${user} from project with id ${projectId}`);
    const project = await this.getProjectById(projectId);

    const userFound = await this.userService.getUserByIdOrUsername(user);
    await project.removeOwners(userFound);
    return project.getOwners();
  }
}
