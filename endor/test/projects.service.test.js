import { expect } from 'chai';
// Using Expect style
const sequalize = require('../src/db/sequelize');

import UserService from './../src/services/users.service';
import { getMockLogger } from './mockLogger';
import ProjectService from '../src/services/projects.service';
import { defineTables, populateTools } from '../src/db/init_database';
import { populateUsers, populateProjects } from '../src/db/import_test_data';

// Initialize Sequelize with sqlite for testing
sequalize.initSequelize(
  'database',
  'root',
  'root', {
    dialect: 'sqlite',
    logging: false
  }
);

const userService = new UserService(sequalize.User, sequalize.Credentials, getMockLogger());
const projectService = new ProjectService(sequalize.Project, userService, getMockLogger());

describe('Testing Project Service', async () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateTools();
    await populateProjects();
  });

  describe('get all projects', async () => {
    it('should get all projects from the database', async () => {
      const projects = await projectService.getAllProjects();
      expect(projects.length).to.equal(3);
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
      expect(project.id).to.equal(4);
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
      expect(project.id).to.equal(4);

      // filter projects by the id to make sure it can be retrieved via mass retrieve
      const projects = await projectService.getAllProjects();
      const filteredProjects = projects.filter((p) => {
        return (p.id === 4);
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
      expect(project.id).to.equal(4);

      const owners = await project.getOwners();
      expect(owners.length).to.equal(1);
      expect(owners[0].id).to.equal(1);
      expect(owners[0].username).to.equal('BobSagat');

      const owned = await projectService.getProjectsByUser(1);

      const filteredOwned = owned.owned.filter((p) => {
        return p.id === 4;
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
      expect(projects.length).to.equal(2);
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