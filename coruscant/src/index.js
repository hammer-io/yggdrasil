import React from 'react'
import * as firebase from 'firebase'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import throttle from 'lodash/throttle'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from '../style/theme'
import getStore from './store'
import { saveState } from './utils/localStorage'
import App from './containers/App'
import Menu from './containers/Menu'
import Home from './containers/Home'
import Login from './containers/Login'
import ProjectOverview from './containers/ProjectOverview'
import Register from './containers/Register'
import UserSettings from './containers/UserSettings'
import NotFound from './components/PageNotFound'
import TyrInfo from './components/TyrInfo'
import NewProject from './containers/NewProject'
import config from '../config/default.json'

const store = getStore()
store.subscribe(throttle(() => {
  saveState({
    session: store.getState().session
  })
}), 1000)

firebase.initializeApp(config.firebase)

const Root = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
            <Route path={['/home', '/projects', '/projects/new']} component={Menu} />
            <Route path={['/home', '/projects/:id', '/settings', '/tyr']} component={Menu} />
          </Switch>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/projects/new" component={NewProject} />
            <Route exact path="/projects/:id" component={ProjectOverview} />
            <Route exact path="/settings/:tabValue" component={UserSettings} />
            <Route exact path="/settings" render={() => <Redirect to="/settings/profile" />} />
            <Route exact path="/tyr" component={TyrInfo} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

export default Root
