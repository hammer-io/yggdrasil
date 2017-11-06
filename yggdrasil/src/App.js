import React, { Component } from 'react';
import logo from './i/Viking_Hammer_Logo_1.png';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextFieldExampleSimple from './ProjectPrompts';

class App extends Component {

    componentDidMount() {
        document.title = "Tyr - Hammer.io";
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hammer-io</h1>
        </header>
          <MuiThemeProvider>
              <TextFieldExampleSimple />
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;


