/* eslint-disable prefer-destructuring */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import * as firebase from 'firebase'
import _ from 'lodash'
import DocumentTitle from 'react-document-title'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from '../style/theme'
import getStore from './store'
import { saveState } from './utils/localStorage'
import App from './containers/App'
import Menu from './containers/Menu'
import Home from './containers/Home'
import Login from './containers/Login'
import ProjectDetails from './containers/ProjectDetails'
import Register from './containers/Register'
import UserSettings from './containers/UserSettings'
import GithubRedirect from './containers/GithubRedirect'
import HerokuRedirect from './containers/HerokuRedirect'
import NotFound from './components/misc/PageNotFound'
import TyrInfo from './containers/TyrInfo'
import NewProject from './containers/NewProject'
import config from './utils/config'
import ErrorSnackbar from './components/misc/ErrorSnackbar'
import LandingPage from './containers/LandingPage'

firebase.initializeApp(config.firebase)

const store = getStore()
store.subscribe(_.throttle(() => {
  saveState({
    session: store.getState().session
  })
}), 1000)

const Root = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <DocumentTitle title="Hammer-io">
      <Provider store={store}>
        <Router>
          <App>
            <Route component={Menu} />
            <Route component={ErrorSnackbar} />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/projects/new" component={NewProject} />
              <Route exact path="/projects/:id/:tabValue" component={ProjectDetails} />
              <Route exact path="/projects/:id" component={ProjectDetails} />
              <Route exact path="/settings/:tabValue" component={UserSettings} />
              <Route exact path="/settings" render={() => <Redirect to="/settings/profile" />} />
              <Route exact path="/githubAuth" component={GithubRedirect} />
              <Route exact path="/herokuAuth" component={HerokuRedirect} />
              <Route exact path="/tyr" component={TyrInfo} />
              <Route component={NotFound} />
            </Switch>
          </App>
        </Router>
      </Provider>
    </DocumentTitle>
  </MuiThemeProvider>
)

export default Root
