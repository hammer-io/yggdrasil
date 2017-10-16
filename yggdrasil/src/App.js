import React, { Component } from 'react';
import logo from './i/Viking_Hammer_Logo_1.png';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './ExampleMaterialUIButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hammer-io</h1>
        </header>
        <p className="App-intro">
          Hello World
        </p>
          <MuiThemeProvider>
              <MyAwesomeReactComponent />
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;


