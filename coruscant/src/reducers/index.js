import { combineReducers } from 'redux'

import session from './session'
import projects from './projects'

export default combineReducers({
  session,
  projects
})
