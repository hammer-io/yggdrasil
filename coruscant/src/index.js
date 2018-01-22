import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import throttle from 'lodash/throttle'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getStore from './store'
import { saveState } from './utils/localStorage'
import App from './containers/App'
import Menu from './components/Menu'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import NotFound from './components/NotFound'

const store = getStore()
store.subscribe(throttle(() => {
  saveState({
    session: store.getStats().session
  })
}), 1000)

const Root = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
            <Route path={['/home']} component={Menu} />
          </Switch>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

export default Root
