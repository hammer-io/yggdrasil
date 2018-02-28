import { combineReducers } from 'redux'

import session from './session'
import projects from './projects'
import tools from './tools'

export default combineReducers({
  session,
  projects,
  tools
})
