import { setError } from '../actions/error'

export default function (dispatch, error) {
  if (error && error.message) {
    dispatch(setError(error.message))
  }
  console.error(error)
}
