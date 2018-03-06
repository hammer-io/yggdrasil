import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './../reducers'
import { loadState } from './../utils/localStorage'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = loadState()

// The logger middleware is only included in non-production environments
const isProductionEnvironment = (process.env.NODE_ENV === 'production')
const middlewares = (isProductionEnvironment)
  ? applyMiddleware(thunkMiddleware)
  : applyMiddleware(thunkMiddleware, createLogger())

const getStore = () => createStore(
  reducer,
  persistedState,
  composeEnhancers(middlewares)
)

export default getStore
