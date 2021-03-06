import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import FormFieldData from "../form/FormFieldData";
import {CreateFormField} from "../form/FormFieldGenerator";
import {FormFieldType} from "../form/FormFieldType";
import DataLoader from "../state/DataLoader";
import {State} from "../state/State";
import AuthoritiesService from "./AuthoritiesService";
import googleLogo from "./google-logo.png";

const loginFieldData = new FormFieldData();
loginFieldData.name  = 'username';
loginFieldData.type  = FormFieldType.TEXT;

const passwordFieldData = new FormFieldData();
passwordFieldData.name  = 'password';
passwordFieldData.type  = FormFieldType.PASSWORD;

class LoginComponent extends Component {
  login = () => {
    const user = State.data.entity;
    if (user && user.username && user.password) {
      this.send('login', JSON.stringify(user));
    }
  };

  signup = () => {
    const user = State.data.entity;
    if (user && user.username && user.password) {
      this.send('login/signup', JSON.stringify(user));
    }
  }

  send = (uri: string, user: string) => {
    fetch(uri, {
      method: 'post',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: user
    })
    .then(res => res.json())
    .then(authData => {
      if (authData) {
        State.updateUser({...authData, token: true});
        AuthoritiesService.updateAdminAuthoritiesIfNeeded();
        DataLoader.refreshData();
      }
    });
  }

  render() {
    const {t}        = this.props;
    const loginField = new FormFieldData();
    loginField.name  = 'username';

    return <Grid container alignItems={"center"} spacing={2} direction={"column"}>
      <Grid item xs={6}>
        <Typography>WFRP Helper</Typography>
      </Grid>
      <Grid item xs={6}>
        {CreateFormField(loginFieldData, t, true)}
      </Grid>
      <Grid item xs={6}>
        {CreateFormField(passwordFieldData, t, true)}
      </Grid>
      <Grid item xs={8}>
        <Button onClick={this.login}>{t('login')}</Button>
        <Button onClick={this.signup}>{t('signup')}</Button>
      </Grid>
      <Grid item xs={6}>
        <Button>
          <img src={googleLogo} alt={t('login with Google')} style={{width: 50, height: 50}}/>
          <a href={'/oauth2/authorization/google?redirect_uri=http://localhost:8080/index.html'}
             style={{fontSize: 18}}>{t('login with Google')}</a>
{/*
          <a href={'https://wfrp-helper.ey.r.appspot.com/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect'}
             style={{fontSize: 18}}>{t('login with Google')}</a>
          <a href={'http://localhost:1081/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect'}
             style={{fontSize: 18}}>{t('login with Google')}</a>
*/}
        </Button>
      </Grid>
    </Grid>;
  }
}

export default withTranslation()(LoginComponent);