import * as firebase from 'firebase'
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
  return async (dispatch) => {
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
  return async (dispatch) => {
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
          await firebase.auth().signInWithEmailAndPassword(
            response.result.email,
            credentials.password
          )
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
  return async (dispatch) => {
    try {
      await firebase.auth().signOut()
      dispatch(setAccessToken(null))
      dispatch(setUser(null))
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export function register(credentials) {
  return async (dispatch) => {
    try {
      const fetchClient = new FetchClient()
      const { result, error } = await fetchClient.post({
        url: '/auth/register',
        body: credentials
      })
      if (result) {
        await firebase.auth().createUserWithEmailAndPassword(
          credentials.email,
          credentials.password
        )
        await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
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
  return async () => {
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
  return async () => {
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

export function checkGithubToken(token) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: '/auth/github'
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

export function checkTravisToken(token) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: '/auth/travis'
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

export function checkHerokuToken(token) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: '/auth/heroku'
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


export function exchangeForGithubToken(token, code, state) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.post({
        url: '/auth/github/code',
        body: {
          state,
          code
        }
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

export function exchangeForHerokuToken(token, code, state) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.post({
        url: '/auth/heroku/code',
        body: {
          state,
          code
        }
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

export function deleteGithubToken(token) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.delete({
        url: '/auth/github'
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

export function deleteTravisToken(token) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.delete({
        url: '/auth/travis'
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

export function deleteHerokuToken(token) {
  return async () => {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.delete({
        url: '/auth/heroku'
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
