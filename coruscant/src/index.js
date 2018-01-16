import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { getStore } from './store'
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'

const store = getStore()

export default class Root extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
            <Router>
              <App>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </App>
            </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
