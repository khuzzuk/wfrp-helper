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
        color: 'transparent',
    }),
    multiValueRemove: (provided, state) => ({
        color: 'ghostwhite',
        maxHeight: '1px',
    }),
    singleValue: (provided, state) => ({
        color: 'black',
        maxHeight: '1px',
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
        display: 'inline-flex',
        height: '14px'
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
                       filterOption={(option, input) => option.data.name.startsWith(input)}
                       placeholder={null}
                       isSearchable
                       isMulti/>
    }
}