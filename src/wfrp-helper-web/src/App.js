import {grey, orange} from "@material-ui/core/colors";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import ContentPane from "./content/ContentPane";
import TopMenu from "./menu/TopMenu";
import DataLoader from "./state/DataLoader";
import {State} from "./state/State";
import AuthoritiesService from "./user/AuthoritiesService";
import LoginComponent from "./user/LoginComponent";
import OAuth2RedirectComponent from "./user/OAuth2RedirectComponent";
import PasswordChangeComponent from "./user/PasswordChangeComponent";
import User from "./user/User";

const theme = createMuiTheme({
                               palette: {primary: grey, secondary: orange},
                             });
const authoritiesService = new AuthoritiesService();

export default class App extends Component {

  constructor(props: P, context: any) {
    super(props, context);
    State.onUpdate = data => {
      this.setState({data: data})
    };
    State.data.entity = new User();
  }

  render() {
    const {token, oneTimePassword} = State.data.currentUser;

    if (!token) {
      return <MuiThemeProvider theme={theme}>
        <Switch>
          {/* For static spring build */}
          {/*<Route exact path={"/index.html"} component={LoginComponent}/>*/}
          <Route exact path={"/"} component={LoginComponent}/>
          <Route path={"/oauth2/redirect"} component={OAuth2RedirectComponent}/>
        </Switch>
      </MuiThemeProvider>
    }

    if (oneTimePassword) {
      return <MuiThemeProvider theme={theme}>
        <PasswordChangeComponent/>
      </MuiThemeProvider>
    }

    if (!State.data.currentUser.authorities) {
      authoritiesService.refreshAuthorities();
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
