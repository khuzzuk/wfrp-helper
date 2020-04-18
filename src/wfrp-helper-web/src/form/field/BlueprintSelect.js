import Grid               from "@material-ui/core/Grid";
import React, {Component} from "react";
import {withTranslation}  from "react-i18next";
import Select            from "react-select";
import makeAnimated      from 'react-select/animated'
import {State}           from "../../state/State";

class BlueprintSelect extends Component {
  render() {
    const {
      t, name, label = t(name), suggestions = name, data = State.data[suggestions], value = State.data.entity[name], onChange = selected => State.updateEntity(
          {[name]: selected}),
    } = this.props;

    const desc = value ? <div>{t('price')}: {value.suggestedPrice.toString()},
      {t('wieght')}: {value.suggestedWeight} kg</div> : <div/>;

    return <Grid container spacing={2} alignItems={"center"}>
      <Grid item>{label}</Grid>
      <Grid item xs={6}>
        <Select textFieldProps={{label: label, InputLabelProps: {shrink: false}}}
                options={data}
                components={makeAnimated()}
                getOptionLabel={option => <div>{option.name}</div>}
                getOptionValue={option => option.id}
                filterOption={(option, input) => option.data.name.startsWith(input)}
                onChange={onChange}
                value={value}/>
      </Grid>
      <Grid item>
        {desc}
      </Grid>
    </Grid>;
  }
}

export default withTranslation()(BlueprintSelect);