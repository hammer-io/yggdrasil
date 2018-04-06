import * as Constants from './../constants'

function makeInitialState() {
  return {
    errorMessage: '',
    open: false
  }
}

function setError(state, action) {
  return {
    ...state,
    errorMessage: action.payload.errorMessage,
    open: true
  }
}

function hideError(state) {
  return {
    ...state,
    open: false
  }
}

export default function (state = makeInitialState(), action) {
  switch (action.type) {
    case Constants.SET_ERROR:
      return setError(state, action)
    case Constants.HIDE_ERROR:
      return hideError(state)
    default:
      return state
  }
}
