/* eslint-disable prefer-destructuring */
import * as firebase from 'firebase'
import { externals } from '../../webpack.config'

const config = externals.config

const app = firebase.initializeApp(config.firebase)

module.exports.app = app
module.exports.database = app.database()
