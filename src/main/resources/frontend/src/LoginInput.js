import React, { Component } from 'react';
import {PropTypes} from 'prop-types';

class LoginInput extends Component {
    state = {
        login: '',
        password: ''
    };

    render() {
        const {handleError, ...opts} = this.props;
        this.handleError = handleError;

        return (
            <div>
                <input {...opts} className={'login'} onChange={this.onLoginChange} value={this.state.login}/>
                <password {...opts} className={'password'} onChange={this.onPasswordChange} value={this.state.password}/>
            </div>
        )
    }
}

LoginInput.propTypes = {
    onLoginChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    handleError: PropTypes.func
};

export default LoginInput