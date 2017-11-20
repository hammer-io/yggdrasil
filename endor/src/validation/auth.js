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


// Mocked method while the db is under construction
function existsInDB(username) {
  console.log(username);
  return true;
}

module.exports = function login() {
  return [
    check('username')
      .isEmail().withMessage('Username is invalid')
      .trim()
      .normalizeEmail()
      .custom(username => existsInDB(username))
  // check('password', 'Passwords must be at least 8 characters long')
  //   .isLength({ min: 8 }),
  // sanitize('name')
  //   .whitelist(['abcdefghijklmnopqrstuvwxyz', 'ABCDEFHIJKLMNOPQRSTUVWXYZ', '-', ' '])
  ]
};

