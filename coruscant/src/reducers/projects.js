import { normalize } from 'normalizr'
import * as Constants from './../constants'
import projectList from './../models/projectList'
import issueList from './../models/issueList'
import buildStatusList from './../models/buildStatusList'

function makeInitialState() {
  return {
    all: {},
    owned: {},
    contributed: {},
    issues: {},
    buildStatuses: {},
    fetchedUserProjects: false,
    fetchedIssues: false,
    fetchedBuildStatuses: false
  }
}

function setBuildStatuses(state, action) {
  const normalizedIssues = normalize(action.payload.issues, buildStatusList)
  return {
    ...state,
    buildStatuses: {
      byId: {
        ...normalizedIssues.entities.issues
      },
      allIds: {
        ...normalizedIssues.result
      }
    },
    fetchedBuildStatuses: true
  }
}

function setIssues(state, action) {
  const issues = action.payload.issues.map((issue) => {
    const newIssue = {
      ...issue,
      id: issue.number
    }
    return newIssue
  })
  const normalizedIssues = normalize(issues, issueList)
  return {
    ...state,
    issues: {
      byId: {
        ...normalizedIssues.entities.issues
      },
      allIds: {
        ...normalizedIssues.result
      }
    },
    fetchedIssues: true
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
    case Constants.SET_PROJECTS:
      return setProjects(state, action)
    case Constants.SET_USER_PROJECTS:
      return setUserProjects(state, action)
    case Constants.SET_ISSUES:
      return setIssues(state, action)
    case Constants.SET_BUILD_STATUSES:
      return setBuildStatuses(state, action)
    default:
      return state
  }
}
