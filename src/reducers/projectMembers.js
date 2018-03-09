import { normalize } from 'normalizr'
import * as Constants from './../constants'
import userList from './../models/userList'

function makeInitialState() {
  return {
    contributors: {},
    owners: {},
    fetchedContributors: false,
    fetchedOwners: false
  }
}

function setProjectContributors(state, action) {
  const normalizedContributors = normalize(action.payload.users, userList)
  return {
    ...state,
    contributors: {
      byId: {
        ...normalizedContributors.entities.users
      },
      allIds: {
        ...normalizedContributors.result
      }
    },
    fetchedContributors: true
  }
}

function setProjectOwners(state, action) {
  const normalizedContributors = normalize(action.payload.users, userList)
  return {
    ...state,
    owners: {
      byId: {
        ...normalizedContributors.entities.users
      },
      alIds: {
        ...normalizedContributors.result
      }
    },
    fetchedOwners: true
  }
}

export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_PROJECT_CONTRIBUTORS:
      return setProjectContributors(state, action)
    case Constants.SET_PROJECT_OWNERS:
      return setProjectOwners(state, action)
    default:
      return state
  }
}
