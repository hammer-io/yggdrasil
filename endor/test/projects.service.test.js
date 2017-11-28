import { expect } from 'chai';
// Using Expect style
const sequalize = require('./sequalize-mock');

import UserService from './../dist/services/users.service';
import { getActiveLogger } from '../dist/utils/winston';
import ProjectService from '../src/services/projects.service';

const userService = new UserService(sequalize.User, getActiveLogger());
const projectService = new ProjectService(sequalize.Project, userService, getActiveLogger());

describe('Testing Project Service', async () => {
  beforeEach(async () => {
    await sequalize.User.sync({ force: true });
    await sequalize.Tool.sync({ force: true });
    await sequalize.Project.sync({ force: true });
    await sequalize.ProjectOwner.sync({ force: true });
    await sequalize.ProjectContributor.sync({ force: true });

    await sequalize.Tool.create({
      name: 'TravisCI (open source)',
      toolType: sequalize.ToolType.CONTINUOUS_INTEGRATION,
      websiteUrl: 'https://travis-ci.org/',
      apiUrl: 'https://api.travis-ci.org/',
      documentationUrl: 'https://docs.travis-ci.com/api',
      logoSvgUrl: 'https://travis-ci.com/images/logos/TravisCI-Mascot-1.svg',
      logoLargeUrl: 'https://travis-ci.com/images/logos/TravisCI-Mascot-1.png',
      usageRequirements: 'You must have created a TravisCI open source account before using this tool.',
      specialConsiderations: 'To use the open source version of TravisCI, you must have a GitHub account.'
    });
    await sequalize.Tool.create({
      name: 'Docker Hub',
      toolType: sequalize.ToolType.CONTAINERIZATION,
      websiteUrl: 'https://hub.docker.com/',
      apiUrl: 'https://index.docker.io/v1/',
      documentationUrl: 'https://docs.docker.com/',
      logoLargeUrl: 'https://www.docker.com/sites/default/files/vertical_large.png',
      logoSmallUrl: 'https://www.docker.com/sites/default/files/vertical_small.png',
    });
    await sequalize.Tool.create({
      name: 'Heroku',
      toolType: sequalize.ToolType.DEPLOYMENT,
      websiteUrl: 'https://www.heroku.com/',
      apiUrl: 'https://api.heroku.com/',
      documentationUrl: 'https://devcenter.heroku.com/',
      logoSvgUrl: 'data:image/svg+xml;utf8,<svg width="27" height="30" viewBox="0 0 27 30" xmlns="http://www.w3.org/2000/svg"><title>heroku-logo</title><path d="M3 0C1.13 0 0 1.11 0 2.903v24.194C0 28.883 1.13 30 3 30h21c1.863 0 3-1.11 3-2.903V2.903C26.994 1.11 25.863 0 24 0H3zm21.042 2c.508.006.958.448.958.929V27.07c0 .487-.45.929-.958.929H2.958C2.45 28 2 27.558 2 27.071V2.93c0-.488.45-.93.958-.93h21.084zM20 25h-2.781v-8.506c0-.774-.237-1.048-.468-1.208-1.396-.959-5.414-.042-7.834.916L7 17.012 7.006 5h2.816v7.917a20.99 20.99 0 0 1 1.882-.482c2.988-.643 5.184-.47 6.616.505.787.536 1.68 1.59 1.68 3.554V25zm-6-15h3.293A16.109 16.109 0 0 0 20 5h-3.287c-.49 1.188-1.385 3.188-2.713 5zM7 25v-7l3 3.5L7 25z" fill="%239E7CC1" fill-rule="evenodd"/></svg>',
      logoLargeUrl: 'https://status.heroku.com/images/favicon-4d37b8350e89706867dad5caab4af5e5.ico',
      logoSmallUrl: 'https://id.heroku.com/assets/logo-vertical.png',
      usageRequirements: 'You must have created a Heroku account before using this tool.'
    });
    await sequalize.Tool.create({
      name: 'Express.js',
      toolType: sequalize.ToolType.WEB_FRAMEWORK,
      websiteUrl: 'http://expressjs.com/',
      documentationUrl: 'http://expressjs.com/en/4x/api.html',
      logoLargeUrl: 'https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67',
    });

    await sequalize.User.bulkCreate([
      {
        username: 'BobSagat',
        email: 'Bob@AFV.com',
        firstName: 'Bob',
        lastName: 'Sagat'
      },
      {
        username: 'globalwarmingguy56',
        email: 'Al@saveourplanet.com',
        firstName: 'Al',
        lastName: 'Gore'
      },
      {
        username: 'jreach',
        email: 'jreach@gmail.com',
        firstName: 'Jack',
        lastName: 'Reacher'
      },
      {
        username: 'johnnyb',
        email: 'jbravo@cartoonnetwork.com',
        firstName: 'Johnny',
        lastName: 'Bravo'
      }
    ]);

    const project = await sequalize.Project.create({
      projectName: 'TMNT',
      description: 'You gotta know what a crumpet is to understand cricket!',
      version: '1.2.3',
      license: 'MIT',
      authors: 'Casey Jones, Raphael'
    });

    const project1 = await sequalize.Project.create({
      projectName: 'hammer-io',
      description: 'Hit it with a hammer!',
      version: '1.2.3',
      license: 'MIT',
      authors: 'Jack'
    });

    const user1 = await sequalize.User.findOne({
      where: { username: 'johnnyb' }
    });
    const user2 = await sequalize.User.findOne({
      where: { username: 'jreach' }
    });

    const user3 = await sequalize.User.findOne({
      where: { username: 'BobSagat' }
    });

    const user4 = await sequalize.User.findOne({
      where: {username: 'globalwarmingguy56'}
    });

    await project.addOwners([user1]);
    await project.addContributors([user2, user3, user4]);

    await project1.addOwners([user1, user2, user4]);
    await project1.addContributors([user3]);

    // Add tooling
    const depTools = await sequalize.Tool.findAll({
      where: { toolType: sequalize.ToolType.DEPLOYMENT }
    });
    await project.setDeploymentTool(depTools[0]);
    const ciTools = await sequalize.Tool.findAll({
      where: { toolType: sequalize.ToolType.CONTINUOUS_INTEGRATION }
    });
    await project.setContinuousIntegrationTool(ciTools[0]);
  });

  describe('get all projects', async () => {
    it('should get all projects from the database', async () => {
      const projects = await projectService.getAllProjects();
      expect(projects.length).to.equal(2);
      expect(Array.isArray(projects)).to.equal(true);
    });
  });

  describe('get a project by id', async () => {
    it('should get the project by id', async () => {
      const project = await projectService.getProjectById(1);
      expect(project.projectName).to.equal('TMNT');
      expect(project.description).to.equal('You gotta know what a crumpet is to understand cricket!');
      expect(project.version).to.equal('1.2.3');
      expect(project.license).to.equal('MIT');
      expect(project.authors).to.equal('Casey Jones, Raphael');
    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {
      try {
        const project = await projectService.getProjectById(10000);
        expect(project).to.equal('undefined');
      } catch (error) {
        expect(error.message).to.equal('Project with id 10000 not found');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('get contributors for a project', async () => {
    it('should get the contributors for a project', async () => {
      const contributors = await projectService.getContributorsByProjectId(1);
      expect(contributors.length).to.equal(3);

      expect(contributors[0].id).to.equal(1);
      expect(contributors[1].id).to.equal(2);
      expect(contributors[2].id).to.equal(3);
    });
  });

  describe('get owners for a project', async () => {
    it('should get the owners for a project', async () => {
      const owners = await projectService.getOwnersByProjectId(1);
      console.log(owners);

      expect(owners.length).to.equal(1);

      expect(owners[0].id).to.equal(4);
      expect(owners[0].username).to.equal('johnnyb');
      expect(owners[0].email).to.equal('jbravo@cartoonnetwork.com');
      expect(owners[0].firstName).to.equal('Johnny');
      expect(owners[0].lastName).to.equal('Bravo');
    });
  });

  describe('get projects for a user', async () => {
    it('should get all projects for a user (contributed and owned)', async () => {
      const userProjects = await projectService.getProjectsByUser(2);
      expect(Array.isArray(userProjects.owned)).to.equal(true);
      expect(userProjects.owned.length).to.equal(1);
      expect(userProjects.owned[0].projectName).to.equal('hammer-io');

      expect(Array.isArray(userProjects.contributed)).to.equal(true);
      expect(userProjects.contributed.length).to.equal(1);
      expect(userProjects.contributed[0].projectName).to.equal('TMNT');
    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {
      try {
        const projects = await projectService.getProjectsByUser(10000);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with 10000 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('check if user is an owner on a project', async () =>  {
    it('should return true if a user is an owner on a project', async () => {
      const isContributor = await projectService.checkIfUserIsOwnerOnProject(1, 4);
      expect(isContributor).to.equal(true);
    });

    it('should return false if a user is not a contributor on a project', async () => {
      const isContributor = await projectService.checkIfUserIsOwnerOnProject(1, 2);
      expect(isContributor).to.equal(false);
    });
  });

  describe('check if user is a contributor on a project', async () => {
    it('should return true if a user is a contributor on a project', async () => {
      const isContributor = await projectService.checkIfUserIsContributorOnProject(1, 3);
      expect(isContributor).to.equal(true);
    });

    it('should return false if a user is not a contributor on a project', async () => {
      const isContributor = await projectService.checkIfUserIsContributorOnProject(1, 4);
      expect(isContributor).to.equal(false);
    });
  });

  describe('create a new project', async () => {
    it('should create a new project and return the project created', async () => {
      const newProject = {
        projectName: 'hello world',
        description: 'good bye world',
        version: '1.2.3',
        license: 'MIT',
        authors: 'Creator'
      };

      const project = await projectService.createProject(newProject, 1);
      expect(project.id).to.equal(3);
      expect(project.projectName).to.equal('hello world');
      expect(project.description).to.equal('good bye world');
      expect(project.version).to.equal('1.2.3');
      expect(project.license).to.equal('MIT');
      expect(project.authors).to.equal('Creator');

    });

    it('should create a new project and save it to the database', async () => {
      const newProject = {
        projectName: 'hello world',
        description: 'good bye world',
        version: '1.2.3',
        license: 'MIT',
        authors: 'Creator'
      };

      // // double check to make sure that the project was created
      const project = await projectService.createProject(newProject, 1);
      expect(project.id).to.equal(3);

      // filter projects by the id to make sure it can be retrieved via mass retrieve
      const projects = await projectService.getAllProjects();
      const filteredProjects = projects.filter((p) => {
        return (p.id === 3);
      });

      expect(filteredProjects.length).to.equal(1);
    });

    it('should add the user as an owner to the project', async () => {
      const newProject = {
        projectName: 'hello world',
        description: 'good bye world',
        version: '1.2.3',
        license: 'MIT',
        authors: 'Creator'
      };

      // double check to make sure that the project was created
      const project = await projectService.createProject(newProject, 1);
      expect(project.id).to.equal(3);

      const owners = await project.getOwners();
      expect(owners.length).to.equal(1);
      expect(owners[0].id).to.equal(1);
      expect(owners[0].username).to.equal('BobSagat');

      const owned = await projectService.getProjectsByUser(1);

      const filteredOwned = owned.owned.filter((p) => {
        return p.id === 3;
      });

      expect(filteredOwned.length).to.equal(1);
    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {
      const project = {
        projectName: 'hello world',
        description: 'good bye world',
        version: '1.2.3',
        license: 'MIT',
        authors: 'Creator'
      };

      try {
        const projects = await projectService.createProject(project, 10000);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with 10000 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('add a new contributor to a project', async () => {
    it('should add a new contributor to a project', async () => {
      await projectService.addContributorToProject(1, 2);

      const contributors = await projectService.getContributorsByProjectId(1);
      const filteredContributors = contributors.filter((user) => {
        return user.id === 1;
      });

      const contributed = await projectService.getProjectsByUser(1);
      const filteredContributed = contributed.contributed.filter((project) => {
        return project.id === 1;
      });

      expect(filteredContributors.length).to.equal(1);
      expect(filteredContributed.length).to.equal(1);
    });

    it('should return the contributors after the project addition', async () => {
      const contributors = await projectService.addContributorToProject(1, 2);
      expect(Array.isArray(contributors)).to.equal(true);
      expect(contributors.length).to.equal(3);
    });

    it('should not duplicate the contributor if they have already been added', async () => {
      const contributors = await projectService.addContributorToProject(1, 1);

      // check to make sure the project still has the same number of contributors as before
      expect(Array.isArray(contributors)).to.equal(true);
      expect(contributors.length).to.equal(3);

      // check to make sure they were not added more than once
      const filteredContributors = contributors.filter((user) => {
        return user.id === 1;
      });

      expect(filteredContributors.length).to.equal(1);
    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {
      try {
        const projects = await projectService.addContributorToProject(1, 10000);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with 10000 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {
      try {
        const projects = await projectService.addContributorToProject(10000, 1);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('Project with id 10000 not found');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('add a new owner to a project', async () => {
    it('should add a new owner to a project', async () => {
      await projectService.addOwnerToProject(1, 1);

      const owners = await projectService.getOwnersByProjectId(1);
      const filteredOwners = owners.filter((user) => {
        return user.id === 1;
      });

      const owned = await projectService.getProjectsByUser(1);
      const filteredOwned = owned.owned.filter((project) => {
        return project.id === 1;
      });

      expect(filteredOwners.length).to.equal(1);
      expect(filteredOwned.length).to.equal(1);
    });

    it('should return the contributors after the new addition', async () => {
      const owners = await projectService.addOwnerToProject(1, 1);
      expect(Array.isArray(owners)).to.equal(true);
      expect(owners.length).to.equal(2);
    });

    it('should not duplicate the owner if they have already been added', async () => {
      const owners = await projectService.addOwnerToProject(1, 4);
      expect(Array.isArray(owners)).to.equal(true);
      expect(owners.length).to.equal(1);

      const filteredOwners = owners.filter((user) => {
        return user.id === 4;
      });

      expect(filteredOwners.length).to.equal(1);
    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {
      try {
        const projects = await projectService.addOwnerToProject(1, 10000);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with 10000 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {
      try {
        const projects = await projectService.addOwnerToProject(10000, 1);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('Project with id 10000 not found');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('update a project', async () => {
    it('should update the project details', async () => {
      const newProject = {
        projectName: 'updated TMNT',
        description: 'updated You gotta know what a crumpet is to understand cricket!',
        version: '1.2.3',
        license: 'MIT',
        authors: 'Creator'
      };

      const project = await projectService.updateProject(newProject, 1)
      expect(project.projectName).to.equal('updated TMNT');
      expect(project.description).to.equal('updated You gotta know what a crumpet is to understand cricket!');
      expect(project.version).to.equal('1.2.3');
      expect(project.license).to.equal('MIT');
      expect(project.authors).to.equal('Creator');
    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {
      const newProject = {
        projectName: 'updated TMNT',
        description: 'updated You gotta know what a crumpet is to understand cricket!',
        version: '1.2.3',
        license: 'MIT',
        authors: 'Creator'
      };

      try {
        const projects = await projectService.updateProject(newProject, 10000);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('Project with id 10000 not found');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('delete a project', async () => {
    it('should delete a project from the database', async () => {
      await projectService.deleteProjectById(1, false);
      const projects = await projectService.getAllProjects();
      expect(projects.length).to.equal(1);
    });

    it('should return the deleted project', async () => {
      const project = await projectService.deleteProjectById(1, false);
      expect(project.projectName).to.equal('TMNT');
      expect(project.description).to.equal('You gotta know what a crumpet is to understand cricket!');
      expect(project.version).to.equal('1.2.3');
      expect(project.license).to.equal('MIT');
      expect(project.authors).to.equal('Casey Jones, Raphael');    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {
      try {
        const projects = await projectService.deleteProjectById(10000);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('Project with id 10000 not found');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('delete a contributor from a project', async () => {
    it('should delete a contributor from a project', async () => {
      await projectService.deleteContributorFromProject(1, 3);
      const contributors = await projectService.getContributorsByProjectId(1);
      expect(contributors.length).to.equal(2);
    });

    it('should return the contributors after deletion', async () => {
      const contributors = await projectService.deleteContributorFromProject(1, 3);
      expect(Array.isArray(contributors)).to.equal(true);
      expect(contributors.length).to.equal(2);
    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {
      try {
        const projects = await projectService.deleteContributorFromProject(10000, 1);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('Project with id 10000 not found');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {
      try {
        const projects = await projectService.deleteContributorFromProject(1, 10000);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with 10000 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('delete an owner from a project', async () => {
    it('should delete an owner from a project', async () => {
      await projectService.deleteOwnerFromProject(1, 4);
      const owners = await projectService.getOwnersByProjectId(1);
      expect(owners.length).to.equal(0);
    });

    it('should return the owners after deletion', async () => {
      const owners = await projectService.deleteOwnerFromProject(1, 4);
      expect(Array.isArray(owners)).to.equal(true);
      expect(owners.length).to.equal(0);
    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {
      try {
        const projects = await projectService.deleteOwnerFromProject(10000, 1);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('Project with id 10000 not found');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {
      try {
        const projects = await projectService.deleteOwnerFromProject(1, 10000);
        expect(projects).to.equal('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with 10000 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });
});