import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {Button, TextField} from "@material-ui/core";
import { withCookies } from 'react-cookie';

class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
    }

    handleSubmit = () => {
        console.log(this.state.csrfToken);

        const data = 'username=' + this.state.username + '&password=' + this.state.password + '&submit="loginPerform"';
        fetch("http:/loginPerform", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'XSRF-TOKEN': this.state.csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        }).then(v => {
            console.log(v);
            if (v.status) {
                fetch('http:/nation', {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                }).then(value => {
                    console.log(value);
                });
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
            <div>
                <TextField onChange={this.handleUsername} label={'UserName'} />
                <TextField onChange={this.handlePassword} label={'Password'} type={'password'} />
                <Button onClick={this.handleSubmit} label={'Submit'} />
                <form action={'loginPerform'}>
                    <input type={'text'} onChange={this.handleUsername}/>
                    <input type={'password'} onChange={this.handlePassword}/>
                    <input type={'submit'}/>
                </form>
            </div>
        )
    }
}

export default withCookies(LoginForm)