import React, {Component} from "react";
import Select, {makeAnimated} from 'react-select';

const simpleStyle = {
    control: (provided, state) => ({
        width: '100%',
        display: 'flex'
    }),
    dropdownIndicator: (provided, state) => ({
        color: 'transparent'
    }),
    indicatorSeparator: (provided, state) => ({
        color: 'transparent'
    }),
    clearIndicator: (provided, state) => ({
        color: 'transparent'
    }),
    multiValueRemove: (provided, state) => ({
        color: 'ghostwhite'
    }),
    multiValueLabel: (provided, state) => ({
        background: 'transparent',
        display: 'inline-flex',
        '&::after': {
            content: '","'
        }
    }),
    multiValue: (provided, state) => ({
        background: 'transparent',
        display: 'inline-flex'
    }),
};

export default class SimpleEntityCombobox extends Component {
    render() {
        const {value, options, onChange, customStyle} = this.props;

        return <Select className={customStyle}
                       styles={simpleStyle}
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
                       placeholder={null}
                       isSearchable
                       isMulti/>
    }
}