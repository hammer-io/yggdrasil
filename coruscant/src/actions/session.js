import FetchClient from './../utils/fetchClient'
import actionCreator from './../utils/actionCreator'
import * as Constants from './../constants'

export function setAccessToken(token) {
  return actionCreator(Constants.SET_AUTH_TOKEN, { token })
}

export function setUser(user) {
  return actionCreator(Constants.SET_USER, { user })
}

export function setPreviousRoute(previousRoute) {
  return actionCreator(Constants.SET_PREVIOUS_ROUTE, { previousRoute })
}


export function getSession(token) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: '/user'
      })
      if (result) {
        dispatch(setAccessToken(token))
        dispatch(setUser(result))
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
      const { result, error } = await fetchClient.post({
        url: '/oauth2/token',
        body: {
          ...credentials,
          grant_type: 'password'
        }
      })
      if (result) {
        fetchClient.setAuthToken(result.access_token.value)
        const response = await fetchClient.get({
          url: '/user'
        })
        if (response.result) {
          dispatch(setAccessToken(result.access_token.value))
          dispatch(setUser(response.result))
        } else {
          console.log(response.error)
        }
        return response
      }
      console.log(error)
      return { result: null, error }
    } catch (error) {
      console.log(error)
      return { result: null, error }
    }
  }
}

export function logout() {
  return function (dispatch) {
    try {
      dispatch(setAccessToken(null))
      dispatch(setUser(null))
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
      const { result, error } = await fetchClient.post({
        url: '/auth/register',
        body: credentials
      })
      if (result) {
        dispatch(setAccessToken(result.token.value))
        dispatch(setUser(result.user))
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

export function addGithubToken(token, body) {
  return async function () {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.post({
        url: '/auth/github',
        body
      })
      if (result) {
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

export function addTravisToken(token, body) {
  return async function () {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.post({
        url: '/auth/travis',
        body
      })
      if (result) {
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
