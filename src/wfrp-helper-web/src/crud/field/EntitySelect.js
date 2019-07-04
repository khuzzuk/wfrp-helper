import React, {Component} from "react";
import makeAnimated from 'react-select/lib/animated';
import Select from 'react-select';
import {FormLabel} from "@material-ui/core";

export default class EntitySelect extends Component {
    render() {
        const {label, data, value, onChange, className} = this.props;
        return <div className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <Select textFieldProps={{label: label, InputLabelProps: {shrink: false}}}
                    options={data}
                    components={makeAnimated()}
                    getOptionLabel={option => {
                        return <div>{option.name}</div>
                    }}
                    getOptionValue={option => {
                        return option.id
                    }}
                    onChange={onChange}
                    value={value}/>
        </div>;
    }
}
