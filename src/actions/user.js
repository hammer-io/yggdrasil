/* eslint import/prefer-default-export: 0 */
import FetchClient from '../utils/fetchClient'
import actionCreator from '../utils/actionCreator'
import * as Constants from '../constants'

export function setUser(user) {
  return actionCreator(Constants.SET_USER, { user })
}

export function getUser(token, user) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: `/users/${user}`
      })
      if (result) {
        return { result, error }
      }
      console.error(error)
      return { result: null, error }
    } catch (error) {
      console.error(error)
      return { result: null, error }
    }
  }
}

export function updateUser(token, userId, user) {
  return async (dispatch) => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.patch({
        url: `/users/${userId}`,
        body: user
      })
      if (result) {
        dispatch(setUser(result))
        return { result, error }
      }
      console.error(error)
      return { result: null, error }
    } catch (error) {
      console.error(error)
      return { result: null, error }
    }
  }
}
