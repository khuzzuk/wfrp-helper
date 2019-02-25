import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AppMenu from "./menu/AppMenu";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";
import {Provider} from "react-redux";
import { createStore } from "redux"

const theme = createMuiTheme({
    palette: {
        primary: grey
    }
});

const wfrpStore = createStore((state, action) => {
    return state;
});

class App extends Component {
    render() {
        return (
            <Provider store={wfrpStore}>
                <MuiThemeProvider theme={theme}>
                    <AppMenu/>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
