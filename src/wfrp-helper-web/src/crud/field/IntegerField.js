import React, {Component} from "react";
import {TextField} from "@material-ui/core";

class IntegerField extends Component {
    updateInt = onChange => event => {
        onChange(parseInt(event.target.value))
    };

    render() {
        const {onChange, ...other} = this.props;
        return <TextField type='number' onChange={this.updateInt(onChange)}
                          {...other}/>;
    }
}

export default IntegerField;