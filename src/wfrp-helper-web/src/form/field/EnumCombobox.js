import React, {Component} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import {FormLabel} from "@material-ui/core";
import {State} from "../../state/State";

export default class EnumCombobox extends Component {
    static style = {
        control: (provided, state) => ({
            ...provided,
            width: 400,
            marginLeft: 10
        })
    };

    render() {
        const {
            name,
            suggestions,
            label,
            toView = val => val,
            data = State.data[suggestions].map(toView),
            value = State.data.entity[name],
        } = this.props;

        return <div style={{display: 'inline-flex', justifyContent: 'space-around'}}>
            {label && <FormLabel>{label}</FormLabel>}
            <Select textFieldProps={{label: label, InputLabelProps: {shrink: false}}}
                    styles={EnumCombobox.style}
                    options={data}
                    components={makeAnimated()}
                    onChange={selected => State.updateEntity({[name]: selected})}
                    value={value}
                    getOptionLabel={val => <div>{val.label ? val.label : (typeof val === "string" ? val : undefined)}</div>}
                    getOptionValue={val => val}
                    isSearchable
                    isMulti/>
        </div>;
    }
}
