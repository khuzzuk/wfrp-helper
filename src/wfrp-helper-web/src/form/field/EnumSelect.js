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

  render() {
    const {
      t,
      name,
      suggestions = name,
      value,
      label = t(name),
      data = State.data[suggestions],
      onChange = selected => State.updateEntity({[name]: selected})
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
            value={{label: value, value: value}}
            getOptionLabel={val => <div>{val.label ? val.label : (typeof val
            === "string" ? val : undefined)}</div>}
            getOptionValue={val => val}
            isSearchable
            isClearable/>
      </Grid>
    </Grid>;
  }
}

export default withTranslation()(EnumSelect);