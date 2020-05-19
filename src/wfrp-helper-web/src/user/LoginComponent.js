import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import FormFieldData from "../form/FormFieldData";
import {CreateFormField} from "../form/FormFieldGenerator";
import {FormFieldType} from "../form/FormFieldType";
import DataLoader from "../state/DataLoader";
import {State} from "../state/State";

const loginFieldData = new FormFieldData();
loginFieldData.name = 'username';
loginFieldData.type = FormFieldType.TEXT;

const passwordFieldData = new FormFieldData();
passwordFieldData.name = 'password';
passwordFieldData.type = FormFieldType.PASSWORD;

class LoginComponent extends Component {
  login = () => {
    const user = State.data.entity;
    if (user && user.username && user.password) {
      console.log(user);
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
          DataLoader.refreshData();
        }
      })
    }
  };

  render() {
    const {t} = this.props;
    const loginField = new FormFieldData();
    loginField.name = 'username';

    return <Grid container alignItems={"center"} spacing={2}>
      <Grid item xs={12}>
        {CreateFormField(loginFieldData, t)}
      </Grid>
      <Grid item xs={12}>
        {CreateFormField(passwordFieldData, t)}
      </Grid>
      <Grid item xs={12}>
        <Button onClick={this.login}>{t('login')}</Button>
      </Grid>
      <Grid item xs={12}>
        <Button>{t('signup')}</Button>
      </Grid>
    </Grid>;
  }
}

export default withTranslation()(LoginComponent);