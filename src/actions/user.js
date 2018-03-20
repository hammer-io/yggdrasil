/* eslint import/prefer-default-export: 0 */
import FetchClient from '../utils/fetchClient'

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
