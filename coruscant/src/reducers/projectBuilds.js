import { normalize } from 'normalizr'
import * as Constants from './../constants'
import buildStatusList from './../models/buildStatusList'

function makeInitialState() {
  return {
    all: {},
    fetchedBuildStatuses: false
  }
}

function setBuildStatuses(state, action) {
  const normalizedIssues = normalize(action.payload.issues, buildStatusList)
  return {
    ...state,
    all: {
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


export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_BUILD_STATUSES:
      return setBuildStatuses(state, action)
    default:
      return state
  }
}
