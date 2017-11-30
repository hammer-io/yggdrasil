import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { getStore } from './store'
import App from './containers/app2';
import {logIn, toggleSideMenu} from "./actions/index";

let store = getStore();

export default class Root extends React.Component {
  render() {
      // store.dispatch(logIn(12));
    return (
      <MuiThemeProvider>
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" component={App} />
                </div>
            </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
