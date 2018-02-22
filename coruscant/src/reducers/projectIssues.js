import { normalize } from 'normalizr'
import * as Constants from './../constants'
import issueList from './../models/issueList'

function makeInitialState() {
  return {
    all: {},
    fetchedIssues: false
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
    all: {
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

export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_ISSUES:
      return setIssues(state, action)
    default:
      return state
  }
}
