/* eslint import/prefer-default-export: 0 */
import actionCreator from '../utils/actionCreator'
import * as Constants from '../constants'

export function setError(errorMessage) {
  return actionCreator(Constants.SET_ERROR, { errorMessage })
}

export function hideError() {
  return actionCreator(Constants.HIDE_ERROR)
}
