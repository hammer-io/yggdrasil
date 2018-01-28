import { expect } from 'chai';
import { defineTables } from '../src/db/init_database';
import { populateUsers } from '../src/db/import_test_data';
// Using Expect style
const sequelize = require('../src/db/sequelize');
import dbTestConfig from '../dbTestConfig.json';
import UserService from './../src/services/users.service';
import { getMockLogger } from './mockLogger';

// Initialize Sequelize with sqlite for testing
if (!sequelize.isInitialized()) {
  sequelize.initSequelize(
    dbTestConfig.database,
    dbTestConfig.username,
    dbTestConfig.password,
    dbTestConfig.options
  );
}

const userService = new UserService(sequelize.User, sequelize.Credentials, getMockLogger());

describe('Testing User Service', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
  });

  describe('get user by username or id', async () => {
    it('should find a user by username', async () => {
      const userServiceFoundUser = await userService.getUserByIdOrUsername('BobSagat');
      expect(userServiceFoundUser.id).to.equal(1);
      expect(userServiceFoundUser.username).to.equal('BobSagat');
      expect(userServiceFoundUser.email).to.equal('Bob@AFV.com');
      expect(userServiceFoundUser.firstName).to.equal('Bob');
      expect(userServiceFoundUser.lastName).to.equal('Sagat');
    });

    it('should find a user by id', async () => {
      const userServiceFoundUser = await userService.getUserByIdOrUsername(1);
      expect(userServiceFoundUser.id).to.equal(1);
      expect(userServiceFoundUser.username).to.equal('BobSagat');
      expect(userServiceFoundUser.email).to.equal('Bob@AFV.com');
      expect(userServiceFoundUser.firstName).to.equal('Bob');
      expect(userServiceFoundUser.lastName).to.equal('Sagat');
    });

    it('should throw a UserNotFoundException if username is not found', async () => {
      try {
        const user = await userService.getUserByIdOrUsername('blahblah');
        expect(user).to.be.a('undefined'); // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with blahblah could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });

    it('should throw a UserNotFoundException if user id is not found', async () => {
      try {
        const user = await userService.getUserByIdOrUsername(300000);
        expect(user).to.be.a('undefined'); // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with 300000 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('get user by email', async () => {
    it('should find a user by email', async () => {
      const userServiceFoundUser = await userService.getUserByEmail('Bob@AFV.com');
      expect(userServiceFoundUser.id).to.equal(1);
      expect(userServiceFoundUser.username).to.equal('BobSagat');
      expect(userServiceFoundUser.email).to.equal('Bob@AFV.com');
      expect(userServiceFoundUser.firstName).to.equal('Bob');
      expect(userServiceFoundUser.lastName).to.equal('Sagat');
    });

    it('should throw a UserNotFoundException if email is not found', async () => {
      try {
        const user = await userService.getUserByEmail('notanemail@exists.com');
        expect(user).to.be.a('undefined'); // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal('User with email notanemail@exists.com could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('get all users', async () => {
    it('should find all users in the database', async () => {
      const users = await userService.getAllUsers();
      expect(users.length).to.equal(5);
      expect(Array.isArray(users)).to.equal(true);
    });
  });

  describe('create new user', async () => {
    it('should create a new user', async () => {
      const newUser = {
        username: 'lebron',
        email: 'lebron@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };
      const userCreated = await userService.createUser(newUser, 'plaintext1');
      expect(userCreated.username).to.equal('lebron');
      expect(userCreated.email).to.equal('lebron@cavs.com');
      expect(userCreated.firstName).to.equal('LeBron');
      expect(userCreated.lastName).to.equal('James');
    });

    it('should not require all fields if validation = false', async () => {
      const user = {
        username: 'the_new_jreach',
        email: 'anotherjreach@gmail.com'
      };
      const newUser = await userService.createUser(user, 'my p4ssw0rd 1s s4f3', false);
      expect(newUser.dataValues).to.have.keys(['id', 'email', 'username', 'updatedAt', 'createdAt']);
      expect(newUser.username).to.equal(user.username);
      expect(newUser.id).to.not.be.an('undefined');
    });

    it('should not require all fields if validation = false', async () => {
      const user = {
        username: 'the_new_jreach'
      };
      try {
        const newUser = await userService.createUser(user, 'my p4ssw0rd 1s s4f3', false);
        expect(newUser).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Invalid Request');
        expect(err.errors.length).to.equal(1);
        expect(err.errors.filter(e => e.field === 'email' && e.message === 'Email is' +
          ' required.').length === 1).to.equal(true);
      }
    });

    it('should not use the given id if an id is given', async () => {
      // username of 256 characters
      const newUser = {
        id: '10',
        username: 'LeroyJenkins',
        email: 'newemail@gmail.com',
        firstName: 'Leroy',
        lastName: 'Jenkins'
      };

      const userCreated = await userService.createUser(newUser, 'plaintext1');
      expect(userCreated.username).to.equal(newUser.username);
      expect(userCreated.email).to.equal(newUser.email);
      expect(userCreated.firstName).to.equal(newUser.firstName);
      expect(userCreated.lastName).to.equal(newUser.lastName);
      expect(userCreated.id).to.not.equal(newUser.id);
    });

    it('should have an error for duplicate username', async () => {
      const newUser = {
        username: 'BobSagat',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.createUser(newUser, 'plaintext1');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('username');
        expect(error.errors[0].message).to.equal('User with username BobSagat already exists.');

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have an error for a username with special characters', async () => {
      const newUser = {
        username: 'BobSagat!',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.createUser(newUser, 'plaintext1');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('username');
        expect(error.errors[0].message).to.equal('Usernames should only contain letters, numbers, and underscores.');

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have an error for a username with special characters', async () => {
      const newUser = {
        username: 'Bob Sagat',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.createUser(newUser, 'plaintext1');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('username');
        expect(error.errors[0].message).to.equal('Usernames should only contain letters, numbers, and underscores.');

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have an error for a username with special characters', async () => {
      const newUser = {
        username: '*BobSagat',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.createUser(newUser, 'plaintext1');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('username');
        expect(error.errors[0].message).to.equal('Usernames should only contain letters, numbers, and underscores.');

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have an error for a username with 256 characters or more', async () => {
      // username of 256 characters
      const newUser = {
        username: 'B123456789B123456789B123456789B123456789B123456789B123456789B123456789' +
        'B123456789B123456789B123456789B123456789B123456789B123456789B123456789B123456789' +
        'B123456789B123456789B123456789B123456789B123456789B123456789B123456789B123456789' +
        'B123456789B123456789B123456789B123456789B123456789B123456789B123456789B123456789' +
        'B123456789B123456789B123456789B123456789123456',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.createUser(newUser, 'plaintext1');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('username');
        expect(error.errors[0].message).to.equal('Usernames should be less than 255 characters.');

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have an error for a password with less than eight characters', async () => {
      const newUser = {
        username: 'BobSagat45',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.createUser(newUser, 'pass1');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('password');
        expect(error.errors[0].message).to.equal('Must contain at least one digit, one letter and have at least eight characters.');

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have an error for a password with all letters', async () => {
      const newUser = {
        username: 'BobSagat45',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.createUser(newUser, 'passwordattempt');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('password');
        expect(error.errors[0].message).to.equal('Must contain at least one digit, one letter and have at least eight characters.');

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have an error for a password with all digits', async () => {
      const newUser = {
        username: 'BobSagat45',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.createUser(newUser, '0123456789');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('password');
        expect(error.errors[0].message).to.equal('Must contain at least one digit, one letter and have at least eight characters.');

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have an error for duplicate email', async () => {
      const newUser = {
        username: 'newusername',
        email: 'Bob@AFV.com',
        firstName: 'Bob',
        lastName: 'Sagat'
      };

      try {
        const userCreated = await userService.createUser(newUser, 'plaintext1');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('email');
        expect(error.errors[0].message).to.equal('User with email Bob@AFV.com already exists.')

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);
      }
    });

    it('should have errors for missing fields', async () => {
      const newUser = {};

      try {
        const userCreated = await userService.createUser(newUser, 'plaintext1');
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors).to.not.be.an('undefined');
        expect(error.errors.length).to.equal(4);

        // check that the user was not created
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(5);

        // test that the errors are there
        expect(error.errors.filter(e => e.field === 'username' && e.message === 'Username is' +
          ' required.').length === 1).to.equal(true);

        expect(error.errors.filter(e => e.field === 'email' && e.message === 'Email is' +
          ' required.').length === 1).to.equal(true);

        expect(error.errors.filter(e => e.field === 'firstName' && e.message === 'First Name is' +
          ' required.').length === 1).to.equal(true);

        expect(error.errors.filter(e => e.field === 'lastName' && e.message === 'Last Name is' +
          ' required.').length === 1).to.equal(true);
      }
    });
  });

  describe('update a user', async () => {
    it('should update the user by id', async () => {
      const user = {
        username: 'UpdateBobSagat',
        email: 'UpdateBob@AFV.com',
        firstName: 'UpdateBob',
        lastName: 'UpdateSagat'
      };

      const updatedUser = await userService.updateUser(1, user);
      expect(updatedUser.id).to.equal(1);
      expect(updatedUser.username).to.equal('UpdateBobSagat');
      expect(updatedUser.email).to.equal('UpdateBob@AFV.com');
      expect(updatedUser.firstName).to.equal('UpdateBob');
      expect(updatedUser.lastName).to.equal('UpdateSagat');
    });

    it('should update the user by username', async () => {
      const user =  {
        username: 'Updatejreach',
        email: 'Updatejreach@gmail.com',
        firstName: 'UpdateJack',
        lastName: 'UpdateReacher'
      };

      const updatedUser = await userService.updateUser('jreach', user);
      expect(updatedUser.id).to.equal(3);
      expect(updatedUser.username).to.equal('Updatejreach');
      expect(updatedUser.email).to.equal('Updatejreach@gmail.com');
      expect(updatedUser.firstName).to.equal('UpdateJack');
      expect(updatedUser.lastName).to.equal('UpdateReacher');
    });

    it('should have an error for duplicate username', async () => {
      const newUser = {
        username: 'BobSagat',
        email: 'newemail@cavs.com',
        firstName: 'LeBron',
        lastName: 'James'
      };

      try {
        const userCreated = await userService.updateUser('BobSagat', newUser);
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('username');
        expect(error.errors[0].message).to.equal('User with username BobSagat already exists.');
      }
    });

    it('should have an error for duplicate email', async () => {
      const newUser = {
        username: 'newusername',
        email: 'Bob@AFV.com',
        firstName: 'Bob',
        lastName: 'Sagat'
      };

      try {
        const userCreated = await userService.updateUser(3, newUser);
        expect(userCreated).to.be('undefined');
      } catch (error) {
        expect(error.errors.length).to.equal(1);
        expect(error.errors[0].field).to.equal('email');
        expect(error.errors[0].message).to.equal('User with email Bob@AFV.com already exists.');
      }
    });
  });

  describe('delete a user', async () => {
    it('should delete the user by id', async () => {
      const deletedUser = await userService.deleteUserByIdOrUsername(1);

      // check that the user was actually deleted
      const users = await userService.getAllUsers();
      expect(users.length).to.equal(4);

      // check that the user can no longer be retrieved
      try {
        const user = await userService.getUserByIdOrUsername(1);
        expect(user).to.be.a('undefined'); // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
      } catch (error) {
        expect(error.message).to.equal('User with 1 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }

      // check the deleted user information
      expect(deletedUser.id).to.equal(1);
      expect(deletedUser.username).to.equal('BobSagat');
      expect(deletedUser.email).to.equal('Bob@AFV.com');
      expect(deletedUser.firstName).to.equal('Bob');
      expect(deletedUser.lastName).to.equal('Sagat');
    });

    it('should delete the user by username', async () => {
      it('should delete the user by username', async () => {
        const deletedUser = await userService.deleteUserByIdOrUsername('BobSagat');

        // check that the user was actually deleted
        const users = await userService.getAllUsers();
        expect(users.length).to.equal(3);

        // check that the user can no longer be retrieved
        try {
          const user = await userService.getUserByIdOrUsername('BobSagat');
          expect(user).to.be.a('undefined'); // this will fail if the error is not thrown and the
          // object actually has value. Theoretically should not be called.
        } catch (error) {
          expect(error.message).to.equal('User with 1 could not be found.');
          expect(error.type).to.equal('Not Found');
          expect(error.status).to.equal(404);
        }

        // check the deleted user information
        expect(deletedUser.id).to.equal(1);
        expect(deletedUser.username).to.equal('BobSagat');
        expect(deletedUser.email).to.equal('Bob@AFV.com');
        expect(deletedUser.firstName).to.equal('Bob');
        expect(deletedUser.lastName).to.equal('Sagat');
      });
    });

    it('should throw an error if the id does not exist', async () => {
      try {
        const user = await userService.deleteUserByIdOrUsername(10);
        expect(user).to.be.a('undefined'); // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
      } catch (error) {
        expect(error.message).to.equal('User with 10 could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });

    it('should throw an error if the username does not exist', async () => {
      try {
        const user = await userService.deleteUserByIdOrUsername('blahblah');
        expect(user).to.be.a('undefined'); // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
      } catch (error) {
        expect(error.message).to.equal('User with blahblah could not be found.');
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('validate a user', async () => {
    it('should validate for missing fields', async () => {
      const newUser = {};
      const errors = await userService.validateUser(newUser, true, true);
      expect(errors.length).to.equal(4);
      expect(errors.filter(e => e.field === 'username' && e.message === 'Username is' +
        ' required.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'email' && e.message === 'Email is' +
        ' required.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'firstName' && e.message === 'First Name is' +
        ' required.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'lastName' && e.message === 'Last Name is' +
        ' required.').length === 1).to.equal(true);
    });

    it('should validate for missing fields', async () => {
      const newUser = {};
      const errors = await userService.validateUser(newUser, true, true);
      expect(errors.length).to.equal(4);
      expect(errors.filter(e => e.field === 'username' && e.message === 'Username is' +
        ' required.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'email' && e.message === 'Email is' +
        ' required.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'firstName' && e.message === 'First Name is' +
        ' required.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'lastName' && e.message === 'Last Name is' +
        ' required.').length === 1).to.equal(true);
    });

    it('should validate for missing username and email fields', async () => {
      const newUser = {};
      const errors = await userService.validateUser(newUser, true, false);
      expect(errors.length).to.equal(2);
      expect(errors.filter(e => e.field === 'username' && e.message === 'Username is' +
        ' required.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'email' && e.message === 'Email is' +
        ' required.').length === 1).to.equal(true);
    });

    it('should validate for missing name fields', async () => {
      const newUser = {};
      const errors = await userService.validateUser(newUser, false, true);
      expect(errors.length).to.equal(2);
      expect(errors.filter(e => e.field === 'firstName' && e.message === 'First Name is' +
        ' required.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'lastName' && e.message === 'Last Name is' +
        ' required.').length === 1).to.equal(true);
    });

    it('should not validate for missing fields when withRequired is false', async () => {
      const newUser = {};
      const errors = await userService.validateUser(newUser, false);
      expect(errors.length).to.equal(0);
    });

    it('should validate for duplicate usernames and emails', async () => {
      const newUser = {
        username: 'BobSagat',
        email: 'Bob@AFV.com',
        firstName: 'Bob',
        lastName: 'Sagat'
      };

      const errors = await userService.validateUser(newUser, false);

      expect(errors.filter(e => e.field === 'username' && e.message === 'User with username' +
        ' BobSagat already exists.').length === 1).to.equal(true);

      expect(errors.filter(e => e.field === 'email' && e.message === 'User with email Bob@AFV.com' +
        ' already exists.').length === 1).to.equal(true);
    });
  });

  describe('get credentials to validate the user', async () => {
    it('should return the user if the username/password combo are correct', async () => {
      let username = 'jreach';
      let password = 'plaintext1';
      const user = await userService.getCredentialsByUsername(username, password);
      expect(user.username).to.equal(username);
      expect(user.password).to.be.an('undefined');
      expect(user.email).to.equal('jreach@gmail.com');
      expect(user.firstName).to.equal('Jack');
      expect(user.lastName).to.equal('Reacher');
    });

    it('should not return the user if the username/password combo are incorrect', async () => {
      let username = 'jreach';
      let password = 'wrong password';
      let user;
      try {
        user = await userService.getCredentialsByUsername(username, password);
      } catch (err) {
        expect(err.type).to.equal('Invalid Credentials');
        expect(err.status).to.equal(403);
        expect(err.message).to.equal('Username and/or password are incorrect.');
      }
      expect(user).to.be.an('undefined');
    });

    it('should not return the user if no password is given', async () => {
      let username = 'jreach';
      let password = '';
      let user;
      try {
        user = await userService.getCredentialsByUsername(username, password);
      } catch (err) {
        expect(err.type).to.equal('Invalid Credentials');
        expect(err.status).to.equal(403);
        expect(err.message).to.equal('Username and/or password are incorrect.');
      }
      expect(user).to.be.an('undefined');
    });

    it('should not return the user if * is given as a password', async () => {
      let username = 'jreach';
      let password = '*';
      let user;
      try {
        user = await userService.getCredentialsByUsername(username, password);
      } catch (err) {
        expect(err.type).to.equal('Invalid Credentials');
        expect(err.status).to.equal(403);
        expect(err.message).to.equal('Username and/or password are incorrect.');
      }
      expect(user).to.be.an('undefined');
    });
  })
});
