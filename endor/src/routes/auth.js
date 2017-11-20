import express from 'express';
import db from '../db/sequelize';

import validator from '../validation/auth';
import sequelize from '../db/sequelize';

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const router = express.Router();

<<<<<<< HEAD

router.post(
  '/login',
  [
    validator.validateUsername(),
    validator.validatePassword()
  ],
  (req, res) => {
  // check that user exists in db
  // return user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    // validator.existsInDB(req.body.username, req.body.password).then((user) => {
    //   if (user) {
    //     if (user.username !== req.body.username || user.password !== req.body.password) {
    //       throw new Error('Invalid Username or Password'); // Indicate failure or something
    //     }
    //   }
    // });
    res.send('Hello, Yggdrasil');
  }
);

router.post(
  '/signup',
  [
    validator.validateNewUsername(),
    validator.validateEmail(),
    validator.validatePassword(),
    validator.validateFirstName(),
    validator.validateLastName()
  ],
  (req, res) => {
    // validator.existsInDB(req.body.username, req.body.password).then((user) => {
    //   if (user) {
    //     if (user.username !== req.body.username || user.password !== req.body.password) {
    //       throw new Error('Invalid Username or Password')
    //     }
    //   }
    // });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    sequelize.User.create({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then(user => res.send(user));
  }
);

module.exports = router;

