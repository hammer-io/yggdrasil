import FetchClient from './../utils/fetchClient'
import actionCreator from './../utils/actionCreator'
import * as Constants from './../constants'

export function setAccessToken(token) {
  return actionCreator(Constants.SET_AUTH_TOKEN, { token })
}

export function setUser(user) {
  return actionCreator(Constants.SET_USER, { user })
}

export function getSession(token) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get('/api/user')
      if (result) {
        dispatch(setAccessToken(token))
        dispatch(setUser(result.user))
      } else {
        console.log(error)
      }
      return { result, error }
    } catch (error) {
      console.log(error)
      return { result: null, error }
    }
  }
}

export function login(credentials) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      console.log('In login')
      const { result, error } = await fetchClient.get({
        url: '/auth/login',
        headers: credentials
      })
      if (result) {
        dispatch(setAccessToken(result.token))
        dispatch(setAccessToken(result.user))
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

export function logout(token) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      console.log('In logout')
      const { error } = await fetchClient.get({
        url: '/auth/logout'
      })
      if (!error) {
        dispatch(setAccessToken(''))
        dispatch(setUser({}))
        return null
      }
      return error
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export function register(credentials) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      console.log('In register')
      const { result, error } = await fetchClient.post({
        url: '/auth/register',
        body: credentials
      })
      if (result) {
        dispatch(setAccessToken(result.token))
        dispatch(setAccessToken(result.user))
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
