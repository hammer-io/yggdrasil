import FetchClient from '../utils/fetchClient'
import * as Constants from '../constants'
import actionCreator from '../utils/actionCreator'
import logError from '../utils/error'

export function setTools(tools) {
  return actionCreator(Constants.SET_TOOLS, { tools })
}

export function getTools(token) {
  return async (dispatch) => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({ url: '/tools' })
      if (result) {
        dispatch(setTools(result))
        return { result, error }
      }
      logError(dispatch, error)
      return { result: null, error }
    } catch (error) {
      logError(dispatch, error)
      return { result: null, error }
    }
  }
}
