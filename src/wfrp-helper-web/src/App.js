import React, {Component} from 'react';
import './App.css';
import AppMenu from "./menu/AppMenu";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";
import {createStore, Store} from "redux";
import {reducers} from "./state/ReducersFactory";

const theme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: {
            main: grey[900]
        }
    },
    form: {
        justifyContent: 'space-around'
    },
    formContent: {
        justifyContent: 'space-around'
    },
    formButtons: {
        justifyContent: 'flex-end'
    }
});

export const STORE: Store = createStore(reducers);

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <AppMenu/>
            </MuiThemeProvider>
        );
    }
}

export default App;
