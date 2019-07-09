import React, {Component} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'

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
};

export default class SimpleEntitySelect extends Component {
    render() {
        const {value, options, onChange, className, customStyle} = this.props;
        const selectStyle = customStyle ? {...simpleStyle, ...customStyle} : simpleStyle;

        return <Select className={className}
                       styles={selectStyle}
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
                       isSearchable/>
    }
}