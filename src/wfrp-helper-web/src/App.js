import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AppMenu from "./menu/AppMenu";

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppMenu/>
            </div>
        );
    }
}

export default App;
