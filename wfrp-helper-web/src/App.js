import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./LoginForm";
import Menu from "./menu/Menu";
import { CookiesProvider } from 'react-cookie';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <div className="App">
                    <Menu/>

                    <LoginForm/>
                </div>
            </CookiesProvider>
        );
    }
}

export default App;
