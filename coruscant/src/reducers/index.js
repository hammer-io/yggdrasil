import { combineReducers } from 'redux'

import session from './session'
import projects from './projects'
import projectMembers from './projectMembers'

export default combineReducers({
  session,
  projects,
  projectMembers
})
