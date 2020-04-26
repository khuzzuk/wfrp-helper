import React, {Component} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import {FormLabel} from "@material-ui/core";
import {withTranslation} from "react-i18next";
import {State} from "../../state/State";

class EntitySelect extends Component {
    render() {
        const {
            t,
            name,
            label = t(name),
            suggestions = name,
            data = State.data[suggestions],
            value = State.data.entity[name],
            multi = false,
            onChange = this.updateEntity
        } = this.props;

        return <div>
            <FormLabel>{label}</FormLabel>
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
                    value={value}
                    isMulti={multi}/>
        </div>;
    }

    updateEntity = newValue => {
        const {name} = this.props;
        const entity = State.data.entity;
        entity.updateWith({[name]: newValue});
        State.update({entity: entity})
    };
}

export default withTranslation()(EntitySelect);