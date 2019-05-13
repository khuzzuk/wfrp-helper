import React, {Component} from "react";
import {Input, InputAdornment} from "@material-ui/core";

export default class SuffixedInputField extends Component {
    updateInt = onChange => event => {
        let number = parseInt(event.target.value);
        if (number && number > 0) onChange(number)
    };

    render() {
        const {onChange, suffixClass, suffix, ...other} = this.props;
        return <Input onChange={this.updateInt(onChange)}
                      endAdornment={<InputAdornment position={'end'}><p className={suffixClass}>{suffix}</p></InputAdornment>}
                      {...other}/>;
    }
}
