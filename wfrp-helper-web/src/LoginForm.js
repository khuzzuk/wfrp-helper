import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {Button, TextField} from "@material-ui/core";

class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    };

    handleSubmit = () => {
        const authData = new FormData(this.form);
        console.log(authData);
        fetch("http:/loginPerform", {
            method: 'POST',
            body: new URLSearchParams(authData)
        }).then(v => {
            if (v.redirected) {
                window.location = v.url;
            }
        }).catch(e => console.warn(e));
    };

    handleUsername = (event) => {
        this.setState({username: event.target.value})
    };
    handlePassword = (event) => {
        this.setState({password: event.target.value})
    };

    render() {
        return (
            <form ref={f => this.form = f}>
                <input key={'username'} name={'username'} id={'username'} placeholder={'Username'} type={'text'} value={this.state.username || ''} onChange={this.handleUsername}/>
                <input key={'password'} name={'password'} id={'password'} placeholder={'Password'} type={'password'} value={this.state.password || ''} onChange={this.handlePassword}/>
                <input key={'submit'} type={'submit'} value={'Submit'} onClick={this.handleSubmit}/>
            </form>
        )
    }
}

export default LoginForm