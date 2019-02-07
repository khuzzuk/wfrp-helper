import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {Button, TextField} from "@material-ui/core";

class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    };

    handleSubmit = () => {
        this.setState({username: 'user'});
        console.log('submit form')
    };

    render() {
        return (
            <div>
                <TextField label={'Username'} value={this.state.username || ''}/>
                <Button variant={'raised'} action={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}

export default LoginForm