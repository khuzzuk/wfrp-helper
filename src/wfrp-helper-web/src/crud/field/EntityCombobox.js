import React, {Component} from "react";
import makeAnimated from 'react-select/lib/animated';
import Select from 'react-select';

export default class EntityCombobox extends Component {
    render() {
        const {label, data, value, onChange} = this.props;
        return <Select textFieldProps={{label: label, InputLabelProps: {shrink: false}}}
                       options={data}
                       components={makeAnimated()}
                       getOptionLabel={option => { return <div>{option.name}</div>}}
                       getOptionValue={option => { return option.id}}
                       onChange={onChange}
                       value={value}
                       isMulti/>;
    }
}