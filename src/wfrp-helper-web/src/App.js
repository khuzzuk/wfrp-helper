import React, {Component} from 'react';
import './App.css';
import AppMenu from "./menu/AppMenu";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: grey
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
