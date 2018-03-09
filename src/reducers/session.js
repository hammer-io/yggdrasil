import * as Constants from './../constants'

function makeInitialState() {
  return {
    authToken: null,
    user: null,
    previousRoute: null
  }
}

function setAccessToken(state, action) {
  return {
    ...state,
    authToken: action.payload.token
  }
}

function setUser(state, action) {
  return {
    ...state,
    user: action.payload.user
  }
}

function setPreviousRoute(state, action) {
  return {
    ...state,
    previousRoute: action.payload.previousRoute
  }
}

export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_AUTH_TOKEN:
      return setAccessToken(state, action)
    case Constants.SET_USER:
      return setUser(state, action)
    case Constants.SET_PREVIOUS_ROUTE:
      return setPreviousRoute(state, action)
    default:
      return state
  }
}
