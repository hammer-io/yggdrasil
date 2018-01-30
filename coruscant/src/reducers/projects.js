import * as Constants from './../constants'

function makeInitialState() {
  return {
    all: [],
    owned: [],
    contributed: [],
    fetchedUserProjects: false
  }
}

function setProjects(state, action) {
  return {
    ...state,
    all: [
      ...action.payload.projects
    ]
  }
}

function setUserProjects(state, action) {
  return {
    ...state,
    owned: [
      ...action.payload.projects.owned
    ],
    contributed: [
      ...action.payload.projects.contributed
    ],
    fetchedUserProjects: true
  }
}

export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_PROJECTS:
      return setProjects(state, action)
    case Constants.SET_USER_PROJECTS:
      return setUserProjects(state, action)
    default:
      return state
  }
}
