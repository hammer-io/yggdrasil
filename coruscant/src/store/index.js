import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './../reducers'
import { loadState } from './../utils/localStorage'

const loggerMiddleware = createLogger()
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = loadState()

const getStore = () => createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ))
)

export default getStore
