import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import AuthoritiesService from "./AuthoritiesService";

const authoritiesService = new AuthoritiesService();

class PasswordChangeComponent extends Component {
  state = {
    password: null, repeat: null
  };

  onChange = prop => event => {
    this.setState({[prop]: event.target.value})
  };

  savePassword = () => {
    const {password, repeat} = this.state;
    if (password === repeat) {
      authoritiesService.updatePassword(password);
    }
  };

  render() {
    const {password, repeat} = this.state;
    const {t}                = this.props;

    return <div>
      <TextField key={'password'}
                 label={t('password')}
                 value={password || ''}
                 type={'password'}
                 onChange={this.onChange('password')}/>
      <TextField key={'passwordRepeat'}
                 label={t('passwordRepeat')}
                 value={repeat || ''}
                 type={'password'}
                 onChange={this.onChange('repeat')}/>
      <Button onClick={this.savePassword}>{t('save')}</Button>
    </div>;
  }
}

export default withTranslation()(PasswordChangeComponent);