import React, {Component} from "react";
import Select             from "react-select";
import makeAnimated       from 'react-select/animated'
import {State}            from "../../../state/State";

const simpleStyle = {
  control: (provided, state) => ({
    width: '100%', display: 'flex'
  }), dropdownIndicator: (provided, state) => ({
    color: 'transparent'
  }), indicatorSeparator: (provided, state) => ({
    color: 'white'
  }),
};

export default class SimpleEnumSelect extends Component {

  getData = source => {
    return source.map(e => {
      return {label: e, value: e};
    });
  };

  onSelected = selected => {
    this.props.onChange(selected && selected.value)
  };

  render() {
    const {name, value = State.data.entity[name], options = State.data[name], ...other} = this.props;

    return <Select {...other}
                   styles={simpleStyle}
                   options={options}
                   value={{label: value, value: value}}
                   getOptionLabel={val => <div>{val.label ? val.label : (typeof val === "string"
                       ? val
                       : undefined)}</div>}
                   getOptionValue={val => val}
                   onChange={selected => State.updateEntity({[name]: selected})}
                   components={makeAnimated()}
                   isSearchable/>;
  }
}