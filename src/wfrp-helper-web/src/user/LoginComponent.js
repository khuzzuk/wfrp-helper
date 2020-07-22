import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import FormFieldData from "../form/FormFieldData";
import {CreateFormField} from "../form/FormFieldGenerator";
import {FormFieldType} from "../form/FormFieldType";
import {State} from "../state/State";
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
      fetch('login', {
        method: 'post',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(authData => {
        if (authData.token) {
          State.updateUser(authData);
        }
      })
    }
  };

  render() {
    const {t}        = this.props;
    const loginField = new FormFieldData();
    loginField.name  = 'username';

    return <Grid container alignItems={"center"} spacing={2} xs={12} direction={"column"}>
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
        <Button>{t('signup')}</Button>
      </Grid>
      <Grid item xs={6}>
        <Button>
          <img src={googleLogo} alt={t('login with Google')} style={{width: 50, height: 50}}/>
          <a href={'http://localhost:1081/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect'}
             style={{fontSize: 18}}>{t('login with Google')}</a>
        </Button>
      </Grid>
    </Grid>;
  }
}

export default withTranslation()(LoginComponent);