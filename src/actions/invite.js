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
      console.error(error)
      return { result: null, error }
    } catch (error) {
      console.error(error)
      return { result: null, error }
    }
  }
}

function updateInvite(token, inviteId, action) {
  return async (dispatch) => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.put({
        url: `/invites/${inviteId}/${action}`
      })
      if (result) {
        dispatch(setUserInvites([result]))
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

export function acceptInvite(token, inviteId) {
  return updateInvite(token, inviteId, 'accept')
}

export function declineInvite(token, inviteId) {
  return updateInvite(token, inviteId, 'decline')
}
