import express from 'express';
import db from '../db/sequelize';

import authValidation from '../validation/auth';

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const router = express.Router();

// Mocked method while the db is under construction
function existsInDB(username) {
  console.log(username);
  return true;
}


router.post(
  '/login',
  authValidation(),
  (req, res) => {
  // ensure valid format of request
  // check that user exists in db
  // return user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    console.log(matchedData(req));
    res.send('Hello, Yggdrasil');
  }
);

router.post('/signup', (req, res) => {
  // ensure valid format of requests
  // validate

  // check data base for availability
  // create user in db
  res.send('Hello, Yggdrasil');
});

module.exports = router;

