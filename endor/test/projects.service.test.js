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

    // Add project owners
    const user1 = await sequalize.User.findOne({
      where: { username: 'johnnyb' }
    });
    const user2 = await sequalize.User.findOne({
      where: { username: 'jreach' }
    });
    // One way to specify the owner of a project
    await project.addOwners(user1);
    // Another way to do it
    await user2.addProjectsOwned(project);

    // Add project contributors
    const user3 = await sequalize.User.findOne({
      where: { username: 'BobSagat' }
    });
    await project.addContributors([user1, user2, user3]);

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

    });
  });

  describe('get a project by id', async () => {
    it('should get the project by id', async () => {

    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {

    });
  });

  describe('get contributors for a project', async () => {
    it('should get the contributors for a project', async () => {

    });
  });

  describe('get owners for a project', async () => {
    it('should get the owners for a project', async () => {

    });
  })

  describe('get projects for a user', async () => {
    it('should get all projects for a user (contributed and owned', async () => {

    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {

    });
  });

  describe('check if user is a contributor on a project', async () => {
    it('should return true if a user is a contributor on a project', async () => {

    });

    it('should return false if a user is not a contributor on a project', async () => {

    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {

    });
  });

  describe('create a new project', async () => {
    it('should create a new project', async () => {

    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {

    });
  });

  describe('add a new contributor to a project', async () => {
    it('should add a new contributor to a project', async () => {

    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {

    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {

    });
  });

  describe('add a new owner to a project', async () => {
    it('should add a new owner to a project', async () => {

    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {

    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {

    });
  });

  describe('update a project', async () => {
    it('should update the project details', async () => {

    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {

    });
  });

  describe('delete a project', async () => {
    it('should delete a project from the database', async () => {

    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {

    });
  });

  describe('delete a contributor from a project', async () => {
    it('should delete a contributor from a project', async () => {

    });

    it('should return the contributors after deletion', async () => {

    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {

    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {

    });
  });

  describe('delete an owner from a project', async () => {
    it('should delete an owner from a project', async () => {

    });

    it('should return the owners after deletion', async () => {

    });

    it('should throw a ProjectNotFoundException if the project does not exist', async () => {

    });

    it('should throw a UserNotFoundException if the user does not exist', async () => {

    });
  });

});