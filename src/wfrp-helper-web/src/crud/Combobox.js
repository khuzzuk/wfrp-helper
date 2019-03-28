import React, {Component} from "react";
import {Select} from "@material-ui/core";

class Combobox extends Component {
    render(): React.ReactNode {
        const {...other} = this.props;
        return <Select {...other} />;
    }
}