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
};

export default class SimpleEntitySelect extends Component {
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
                       isSearchable/>
    }
}