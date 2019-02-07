import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./LoginForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Login
          </p>
        </header>
        <LoginForm/>
      </div>
    );
  }
}

export default App;
