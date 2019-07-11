import React, {Component} from 'react';
import './App.css';
import AppMenu from "./menu/AppMenu";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";
import {initBus} from "./state";

const theme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: {
            main: grey[900]
        }
    },
});

class App extends Component {
    constructor(props: P, context: any) {
        super(props, context);
        initBus();
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <AppMenu/>
            </MuiThemeProvider>
        );
    }
}

export default App;
