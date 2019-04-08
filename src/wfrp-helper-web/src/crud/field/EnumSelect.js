import React, {Component} from "react";
import makeAnimated from 'react-select/lib/animated';
import Select from 'react-select';

export default class EnumSelect extends Component {
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
        return <Select textFieldProps={{label: label, InputLabelProps: {shrink: false}}}
                       options={this.getData(data)}
                       components={makeAnimated()}
                       onChange={this.onSelected}
                       value={{label: value, value: value}}
                       isSearchable
                       isClearable/>;
    }
}
