import React, {Component} from "react";
import {FormLabel} from "@material-ui/core";
import EnumSelect from "./EnumSelect";
import IntegerField from "./IntegerField";
import {withTranslation} from "react-i18next";
import {State} from "../../state/State";
import {ActionType} from "../../model/rule/ActionTime";
import Grid from "@material-ui/core/Grid";

class ActionTimeField extends Component {
  onUpdate = updates => {
    const {
      name,
      value = State.data.entity[name],
    } = this.props;
    Object.assign(value, updates);
    State.updateEntity({[name]: value})
  };

  render() {
    const {
      t,
      name,
      label = t(name),
      value = State.data.entity[name],
    } = this.props;

    return <Grid container alignItems={"center"} spacing={2}>
      <Grid item>
        <FormLabel>{label}</FormLabel>
      </Grid>
      <Grid item>
        <EnumSelect key={'actionType'}
                    label={t('type')}
                    data={ActionType.allOf()}
                    value={value.type}
                    onChange={type => this.onUpdate({type: type})}/>
      </Grid>
      <Grid item>
        <IntegerField key={'amount'}
                      label={t('amount')}
                      value={value.amount}
                      onChange={amount => this.onUpdate({amount: amount})}/>
      </Grid>
    </Grid>;
  }
}

export default withTranslation()(ActionTimeField);