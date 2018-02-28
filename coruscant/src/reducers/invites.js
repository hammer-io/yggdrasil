import { normalize } from 'normalizr'
import * as Constants from './../constants'
import inviteList from './../models/inviteList'

function makeInitialState() {
  return {
    all: {},
    fetchedUserInvites: false
  }
}

function setInvites(state, action) {
  const normalizedInvites = normalize(action.payload.invites, inviteList)
  return {
    ...state,
    all: {
      byId: {
        ...normalizedInvites.entities.invites
      },
      allIds: {
        ...normalizedInvites.result
      }
    },
    fetchedUserInvites: true
  }
}

export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_USER_INVITES:
      return setInvites(state, action)
    default:
      return state
  }
}
