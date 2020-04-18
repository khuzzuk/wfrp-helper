import withStyles             from "@material-ui/core/styles/withStyles";
import React, {PureComponent} from "react";
import {State}                from "../../../state/State";

const defaultClass = {
  input: {
    backgroundColor: 'transparent',
    border: 0,
    width: '100%',
    fontFamily: 'wfrp',
    fontSize: '24px',
    textAlign: 'center',
    outline: 'none',
  },
};

class SimpleTextField extends PureComponent {
  parse = onChange => event => {
    const {name, variant} = this.props;
    const change = event.target.value;

    if (change === '') {
      onChange(change);
      return;
    }

    if (variant === TextFieldType.INT) {
      const value = parseInt(change);
      if (value || value === 0) {
        onChange(value);
      } else {
        event.target.value = State.data.entity[name] || '';
      }

    } else if (variant === TextFieldType.FLOAT) {
      const value = parseFloat(change);
      if (value || value === 0) {
        onChange(value);
      } else {
        event.target.value = State.data.entity[name] || '';
      }

    } else {
      onChange(change);
    }
  };

  render() {
    const {
            name,
            value = State.data.entity[name],
            classes,
            customStyle,
            onChange = val => State.updateEntity({[name]: val})
    } = this.props;

    return <input className={classes.input} style={customStyle} value={value}
                  onChange={this.parse(onChange)}/>
  }
}

export default withStyles(defaultClass)(SimpleTextField);

export const TextFieldType = {
  TEXT: 'TEXT', INT: 'INT', FLOAT: 'FLOAT',
};