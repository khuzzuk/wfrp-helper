import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./LoginForm";
import Menu from "./menu/Menu";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Menu/>

        <LoginForm/>
      </div>
    );
  }
}

export default App;
