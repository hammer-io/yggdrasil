import
{
  check,
  validationResult
} from 'express-validator/check';
import
{
  matchedData,
  sanitize
} from 'express-validator/filter';
import sequelize from '../db/sequelize';


// Mocked method while the db is under construction
module.exports.existsInDB = function existsInDB(username, password) {
  const queryParams = {
    where: { username }
  };
  if (password) {
    queryParams.where.password = password;
  }
  return sequelize.User.findOne(queryParams);
};

module.exports.validateEmail = function validateEmail() {
  return check('email', 'Invalid email')
    .isEmail().withMessage('Email is invalid')
    .trim()
    .normalizeEmail();
};


module.exports.validateUsername = function validateUsername() {
  return check('username', 'Invalid Username')
    .isLength({ min: 1 })
    .matches(/^[a-zA-Z _0-9]*$/);
};

/**
 * Validates a new username.  Checking that it has a length of at least 1,
 * is comprised of letters, numbers, spaces, or underscores, and that is does not already exist
 *
 * @returns {ValidationChain}
 */
module.exports.validateNewUsername = function validateNewUsername() {
  return this.validateUsername()
    .withMessage('Username is not valid. It must only contain letters, numbers, and spaces and underscores')
    .custom(username => this.existsInDB(username).then((user) => {
      if (user) {
        throw new Error('This Username is Already Taken');
      }
      return true;
    }));
};

module.exports.validatePassword = function validatePassword() {
  return check('password', 'Passwords must be at least 8 characters long and contain a number and a letter')
    .isLength({ min: 8 })
    .matches(/\d/)
    .matches(/[a-zA-Z_]/);
};

module.exports.validateFirstName = function validateFirstName() {
  return check('firstName', 'User Must Have a First Name').exists();
};

module.exports.validateLastName = function validateLastName() {
  return check('firstName', 'User Must Have a LastName').exists();
};

