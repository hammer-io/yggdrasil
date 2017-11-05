import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { getStore } from './store'
import App from './containers/app';

export default class Root extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={getStore()}>
          <Router>
            <Route path="/" component={App} />
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
