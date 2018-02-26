import { normalize } from 'normalizr'
import * as Constants from './../constants'
import toolList from './../models/toolList'

function makeInitialState() {
  return {
    all: {}
  }
}

function setTools(state, action) {
  const normalizedTools = normalize(action.payload.tools, toolList)
  return {
    ...state,
    all: {
      byId: {
        ...normalizedTools.entities.tools
      },
      allIds: {
        ...normalizedTools.result
      }
    }
  }
}

export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_TOOLS:
      return setTools(state, action)
    default:
      return state
  }
}
