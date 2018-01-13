import { combineReducers } from 'redux'
import menuOpen from './menuOpen'
import userID from './userID'
import newProjectInfo from './ProjectCreation'
import registerInfo from './registerInfo'

export default combineReducers({
    menuOpen,
    userID,
    newProjectInfo,
    registerInfo
})