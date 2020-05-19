import {grey, orange} from "@material-ui/core/colors";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import React, {Component} from 'react';
import ContentPane from "./content/ContentPane";
import TopMenu from "./menu/TopMenu";
import {State} from "./state/State";
import LoginComponent from "./user/LoginComponent";
import User from "./user/User";

const theme = createMuiTheme({
                               palette: {primary: grey, secondary: orange},
                             });

export default class App extends Component {

  constructor(props: P, context: any) {
    super(props, context);
    State.onUpdate = data => {
      this.setState({data: data})
    };
    State.data.entity = new User();
  }

  render() {
    const token = State.data.user.token;
    if (!token) {
      return <MuiThemeProvider theme={theme}>
        <LoginComponent/>
      </MuiThemeProvider>
    }

    return (<MuiThemeProvider theme={theme}>
      <TopMenu/>
      <ContentPane/>
    </MuiThemeProvider>);
  }
}
