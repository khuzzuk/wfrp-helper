import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import DataLoader from "../state/DataLoader";
import {State} from "../state/State";

class OAuth2RedirectComponent extends Component {
  render() {
    const token = new RegExp('[\\?&]token=([^&#]*)').exec(this.props.location.search)[1];
    State.updateUser({token: token});

    return <Redirect to={"/"}/>;
  }
}

export default OAuth2RedirectComponent;