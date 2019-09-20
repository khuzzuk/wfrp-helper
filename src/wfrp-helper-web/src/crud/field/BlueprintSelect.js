import React from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import {FormLabel} from "@material-ui/core";
import EntitySelect from "./EntitySelect";

export default class BlueprintSelect extends EntitySelect {
    render() {
        const {label, data, value, onChange, className} = this.props;

        const desc = value ?
            <div>cena: {value.suggestedPrice.toString()}, waga: {value.suggestedWeight} kg</div> :
            <div/>;

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
            {desc}
        </div>;
    }
}
