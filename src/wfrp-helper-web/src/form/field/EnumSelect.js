import React, {Component} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import {FormLabel} from "@material-ui/core";
import {State} from "../../state/State";
import {withTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";

class EnumSelect extends Component {
  static style = {
    control: (provided, state) => ({
      ...provided,
      width: 400,
      marginLeft: 10
    })
  };

  getLabel = val => {
    let label;
    if (typeof val === 'string') label = val;
    else if (val.label) label = val.label;
    if (val.name) return val.name;
    if (val) return val.toString();

    return <div>label</div>;
  }

  render() {
    const {
      t,
      name,
      suggestions = name,
      value,
      label = t(name),
      data = State.data[suggestions],
      onChange = selected => State.updateEntity({[name]: selected}),
      multi,
      editable
    } = this.props;

    return <Grid container spacing={2} alignItems={"center"}>
      <Grid item>
        <FormLabel>{label}</FormLabel>
      </Grid>
      <Grid item>
        <Select
            textFieldProps={{label: label, InputLabelProps: {shrink: false}}}
            styles={EnumSelect.style}
            options={data}
            components={makeAnimated()}
            onChange={onChange}
            value={multi ? value : {label: value, value: value}}
            getOptionLabel={this.getLabel}
            getOptionValue={val => val}
            isSearchable
            isClearable
            isMulti={multi}
            isDisabled={!editable}/>
      </Grid>
    </Grid>;
  }
}

export default withTranslation()(EnumSelect);