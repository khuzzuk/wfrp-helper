import React, {Component} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
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
                    filterOption={(option, input) => option.data.name.startsWith(input)}
                    onChange={onChange}
                    value={value}/>
        </div>;
    }
}
