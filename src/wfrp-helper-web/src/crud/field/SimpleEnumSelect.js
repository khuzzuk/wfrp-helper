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
        const {value, options, customStyle, ...other} = this.props;

        return <Select {...other} className={customStyle}
                       styles={simpleStyle}
                       options={this.getData(options)}
                       value={{label: value, value: value}}
                       onChange={this.onSelected}
                       components={makeAnimated()}
                       isSearchable/>;
    }
}