import { expect } from 'chai';
// Using Expect style
const sequalize = require('./sequalize-mock');

import UserService from './../dist/services/users.service';
import AuthService from './../dist/services/auth.service';
import { getActiveLogger } from '../dist/utils/winston';