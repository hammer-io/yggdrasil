import FetchClient from './../utils/fetchClient'
import actionCreator from './../utils/actionCreator'
import * as Constants from './../constants'

export function setUserProjects(projects) {
  return actionCreator(Constants.SET_USER_PROJECTS, { projects })
}

export function setProjects(projects) {
  return actionCreator(Constants.SET_PROJECTS, { projects })
}

export function setProject(project) {
  return actionCreator(Constants.SET_PROJECT, { project })
}

export function getUserProjects(token) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({ url: '/user/projects' })
      if (result) {
        dispatch(setUserProjects(result))
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

export function getProjects(token) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({ url: '/projects' })
      if (result) {
        dispatch(setProjects(result))
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

export function addProject(token, project) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.post({
        url: '/projects',
        body: project
      })
      if (result) {
        dispatch(setProject(result))
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
