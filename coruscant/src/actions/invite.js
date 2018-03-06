import FetchClient from './../utils/fetchClient'
import actionCreator from './../utils/actionCreator'
import * as Constants from './../constants'

export function setUserInvites(invites) {
  return actionCreator(Constants.SET_USER_INVITES, { invites })
}

export function getUserInvites(token) {
  return async (dispatch) => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({ url: '/user/invites' })
      if (result) {
        dispatch(setUserInvites(result))
        return { result, error }
      }
      console.log(error)
      return { result: null, error }
    } catch (error) {
      console.log(error)
      return { result: null, error }
    }
  }
}
