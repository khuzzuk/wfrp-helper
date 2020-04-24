import {Tooltip} from "@material-ui/core";
import React, {Component} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import {State} from "../../../state/State";

const simpleStyle      = {
  control: (provided, state) => ({
    width: '100%', display: 'flex'
  }), dropdownIndicator: (provided, state) => ({
    color: 'transparent'
  }), indicatorSeparator: (provided, state) => ({
    color: 'transparent'
  }),
};
const simpleStyleMulti = {
  control: (provided, state) => ({
    width: '100%', display: 'flex'
  }), dropdownIndicator: (provided, state) => ({
    color: 'transparent'
  }), indicatorSeparator: (provided, state) => ({
    color: 'transparent'
  }), clearIndicator: (provided, state) => ({
    color: 'transparent',
  }), multiValueRemove: (provided, state) => ({
    color: 'ghostwhite', maxHeight: '1px',
  }), singleValue: (provided, state) => ({
    color: 'black', maxHeight: '1px',
  }), multiValueLabel: (provided, state) => ({
    background: 'transparent', display: 'inline-flex', '&::after': {
      content: '","'
    }
  }), multiValue: (provided, state) => ({
    background: 'transparent', display: 'inline-flex', height: '14px'
  }),
};

export default class SimpleEntitySelect extends Component {
  render() {
    const {
            name,
            propName = name,
            value = State.data.entity[propName],
            options = State.data[name],
            multi,
            className,
            customStyle,
            onChange = selected => State.updateEntity({[propName]: selected})
          } = this.props;

    return <Tooltip title={value && value.description ? value.description : ''}>
      <div style={{...{display: 'inline-block'}, ...customStyle}}>
        <Select className={className}
                styles={multi ? simpleStyleMulti : simpleStyle}
                value={value}
                options={options}
                onChange={onChange}
                components={makeAnimated()}
                getOptionLabel={option => {
                  return <div>{option.name}</div>
                }}
                getOptionValue={option => {
                  return option.id
                }}
                filterOption={(option, input) => option.data.name.startsWith(input)}
                placeholder={<div/>}
                isSearchable
                isMulti={multi}/>
      </div>
    </Tooltip>;
  }
}