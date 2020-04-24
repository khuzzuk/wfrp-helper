import {TextField} from "@material-ui/core";
import React, {Component} from "react";

class IntegerField extends Component {
  updateInt = onChange => event => {
    let number = parseInt(event.target.value);
    if (number || number === 0) {
      onChange(number)
    }
  };

  render() {
    const {onChange, ...other} = this.props;
    return <TextField type='number' onChange={this.updateInt(onChange)} {...other}/>;
  }
}

export default IntegerField;