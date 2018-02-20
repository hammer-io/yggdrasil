import FetchClient from './../utils/fetchClient'
import actionCreator from './../utils/actionCreator'
import * as Constants from './../constants'

export function setUserProjects(projects) {
  return actionCreator(Constants.SET_USER_PROJECTS, { projects })
}

export function setIssues(issues) {
  return actionCreator(Constants.SET_ISSUES, { issues })
}

export function setBuildStatuses(issues) {
  return actionCreator(Constants.SET_BUILD_STATUSES, { issues })
}

export function setProjectContributors(users) {
  return actionCreator(Constants.SET_PROJECT_CONTRIBUTORS, { users })
}

export function setProjectOwners(users) {
  return actionCreator(Constants.SET_PROJECT_OWNERS, { users })
}

export function setProjects(projects) {
  return actionCreator(Constants.SET_PROJECTS, { projects })
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

export function getIssues(token, id, parameters) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: `/projects/${id}/issues?state=${parameters.state}&limit=${parameters.limit}`
      })
      if (result) {
        dispatch(setIssues(result))
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

export function getBuildStatuses(token, id, limit) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: `/projects/${id}/buildstatuses?limit=${limit}`
      })
      if (result) {
        dispatch(setBuildStatuses(result))
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

export function getProjectContributors(token, id) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: `/projects/${id}/contributors`
      })
      if (result) {
        dispatch(setProjectContributors(result))
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

export function getProjectOwners(token, id) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({ url: `/projects/${id}/owners` })
      if (result) {
        dispatch(setProjectOwners(result))
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

export function getProject(token, id) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({ url: `/projects/${id}` })
      if (result) {
        dispatch(setProjects([result]))
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

export function addContributor(token, info) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.post({
        url: `/projects/${info.projectId}/contributors/${info.userId}`
      })
      if (result) {
        dispatch(setProjectContributors(result))
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

export function addOwner(token, info) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.post({
        url: `/projects/${info.projectId}/owners/${info.userId}`
      })
      if (result) {
        dispatch(setProjectOwners(result))
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

export function removeContributor(token, info) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.delete({
        url: `/projects/${info.projectId}/contributors/${info.user}`
      })
      if (result) {
        dispatch(setProjectContributors(result))
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

export function removeOwner(token, info) {
  return async function (dispatch) {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.delete({
        url: `/projects/${info.projectId}/owners/${info.user}`
      })
      if (result) {
        dispatch(setProjectOwners(result))
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

export function getUser(token, user) {
  return async function () {
    try {
      const fetchClient = new FetchClient()
      fetchClient.setAuthToken(token)
      const { result, error } = await fetchClient.get({
        url: `/users/${user}`
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
