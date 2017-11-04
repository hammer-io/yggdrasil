import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getStore } from './store'
import App from './containers/app';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={getStore()}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    );
  }
}
