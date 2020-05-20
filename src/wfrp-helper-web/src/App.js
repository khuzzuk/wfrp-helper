import {grey, orange} from "@material-ui/core/colors";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import ContentPane from "./content/ContentPane";
import TopMenu from "./menu/TopMenu";
import DataLoader from "./state/DataLoader";
import {State} from "./state/State";
import LoginComponent from "./user/LoginComponent";
import OAuth2RedirectComponent from "./user/OAuth2RedirectComponent";
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
        <Switch>
          <Route exact path={"/"} component={LoginComponent}/>
          <Route path={"/oauth2/redirect"} component={OAuth2RedirectComponent}/>
        </Switch>
      </MuiThemeProvider>
    }

    if (!State.data.initialized) {
      DataLoader.refreshData();
      State.data.initialized = true;
    }

    return (<MuiThemeProvider theme={theme}>
      <TopMenu/>
      <ContentPane/>
    </MuiThemeProvider>);
  }
}
