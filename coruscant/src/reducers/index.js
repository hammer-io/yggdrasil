import { combineReducers } from 'redux'

import session from './session'
import projects from './projects'
import projectMembers from './projectMembers'
import projectIssues from './projectIssues'
import projectBuilds from './projectBuilds'
import invites from './invites'

export default combineReducers({
  session,
  projects,
  projectMembers,
  projectIssues,
  projectBuilds,
  invites
})
