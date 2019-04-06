import React, {Component} from "react";
import {TextField} from "@material-ui/core";

class FloatField extends Component {
    updateInt = onChange => event => {
        let number = parseFloat(event.target.value);
        if (number) onChange(number)
    };

    render() {
        const {onChange, ...other} = this.props;
        return <TextField type='number' onChange={this.updateInt(onChange)}
                          {...other}/>;
    }
}

export default FloatField;