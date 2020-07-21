import React, {Component} from "react";
import {FormLabel, TextField} from "@material-ui/core";
import {withTranslation} from "react-i18next";
import {State} from "../../state/State";
import Grid from "@material-ui/core/Grid";

class PriceField extends Component {

  updatePrice = (onChange, part) => event => {
    const {name, value = State.data.entity[name]} = this.props;
    let number = parseInt(event.target.value);
    if (number || number === 0) {
      onChange({...value, ...{[part]: number}})
    }
  };

  render() {
    const {
      t,
      name,
      label = t(name),
      onChange = price => State.updateEntity({[name]: price}),
      value = State.data.entity[name],
      editable
    } = this.props;

    return <Grid container spacing={2} alignItems={"center"}>
      <Grid item>
        <FormLabel style={{marginRight: 10}}>{label}</FormLabel>
      </Grid>
      <Grid item>
        <TextField label={t('gold')}
                   type='number'
                   value={value.gold}
                   onChange={this.updatePrice(onChange, 'gold')}
                   InputProps={{readOnly: !editable}}/>
      </Grid>
      <Grid item>
        <TextField label={t('silver')}
                   type='number'
                   value={value.silver}
                   onChange={this.updatePrice(onChange, 'silver')}
                   InputProps={{readOnly: !editable}}/>
      </Grid>
      <Grid item>
        <TextField label={t('lead')}
                   type='number'
                   value={value.lead}
                   onChange={this.updatePrice(onChange, 'lead')}
                   InputProps={{readOnly: !editable}}/>
      </Grid>
    </Grid>
  }
}

export default withTranslation()(PriceField);