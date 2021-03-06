import { normalize } from 'normalizr'
import * as Constants from './../constants'
import project from './../models/project'
import projectList from './../models/projectList'

function makeInitialState() {
  return {
    all: {},
    owned: {},
    contributed: {},
    fetchedUserProjects: false
  }
}

function setProject(state, action) {
  const normalizedProjects = normalize(action.payload.project, project)
  return {
    ...state,
    all: {
      byId: {
        ...state.all.byId,
        ...normalizedProjects.entities.projects
      },
      allIds: {
        ...state.all.allIds,
        ...normalizedProjects.result
      }
    }
  }
}

function setProjects(state, action) {
  const normalizedProjects = normalize(action.payload.projects, projectList)
  return {
    ...state,
    all: {
      byId: {
        ...normalizedProjects.entities.projects
      },
      allIds: {
        ...normalizedProjects.result
      }
    }
  }
}

function setUserProjects(state, action) {
  const normalizedOwnedProjects = normalize(action.payload.projects.owned, projectList)
  const normalizedContributedProjects = normalize(action.payload.projects.contributed, projectList)
  return {
    ...state,
    owned: {
      byId: {
        ...normalizedOwnedProjects.entities.projects
      },
      allIds: {
        ...normalizedOwnedProjects.result
      }
    },
    contributed: {
      byId: {
        ...normalizedContributedProjects.entities.projects
      },
      alIds: {
        ...normalizedContributedProjects.result
      }
    },
    fetchedUserProjects: true
  }
}

export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_PROJECT:
      return setProject(state, action)
    case Constants.SET_PROJECTS:
      return setProjects(state, action)
    case Constants.SET_USER_PROJECTS:
      return setUserProjects(state, action)
    default:
      return state
  }
}
