import React, {Component} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import {FormLabel} from "@material-ui/core";

export default class EnumSelect extends Component {
    static style = {
        control: (provided, state) => ({...provided,
            width: 400,
            marginLeft: 10
        })
    };

    getData = source => {
        return source.map(e => {
            return {label: e, value: e};
        });
    };

    onSelected = selected => {
        this.props.onChange(selected && selected.value)
    };

    render() {
        const {label, data, value} = this.props;
        return <div style={{display: 'inline-flex', justifyContent: 'space-around'}}>
            <FormLabel>{label}</FormLabel>
            <Select textFieldProps={{label: label, InputLabelProps: {shrink: false}}}
                    styles={EnumSelect.style}
                    options={this.getData(data)}
                    components={makeAnimated()}
                    onChange={this.onSelected}
                    value={{label: value, value: value}}
                    isSearchable
                    isClearable/>
        </div>;
    }
}
