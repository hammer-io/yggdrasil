import { combineReducers } from 'redux'

import session from './session'
import projects from './projects'
import tools from './tools'
import projectMembers from './projectMembers'
import projectIssues from './projectIssues'
import projectBuilds from './projectBuilds'
import invites from './invites'
import error from './error'

export default combineReducers({
  session,
  projects,
  tools,
  projectMembers,
  projectIssues,
  projectBuilds,
  invites,
  error
})
