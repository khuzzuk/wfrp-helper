import Button                         from "@material-ui/core/Button";
import Grid                           from "@material-ui/core/Grid";
import IconButton                     from "@material-ui/core/IconButton";
import Paper                          from "@material-ui/core/Paper";
import {Remove}                       from "@material-ui/icons";
import React, {Component}             from "react";
import {withTranslation}              from "react-i18next";
import Determinant, {DeterminantType} from "../../model/rule/Determinant";
import Modifier, {ModifierType}       from "../../model/rule/Modifier";
import {State}                        from "../../state/State";
import EnumSelect                     from "./EnumSelect";
import IntegerField                   from "./IntegerField";
import ModifierField                  from "./ModifierField";

class DeterminantField extends Component {

  deleteItem = (item) => {
    const value = this.props.value;
    value.splice(value.indexOf(item), 1);
    State.update({currentDeterminantEdit: value});
  };

  update = (determinant, updates) => {
    determinant.updateWith(updates);
    State.updateEntity({[this.props.name]: this.props.value});
  };

  addDeterminant = () => {
    const entity = State.data.entity;
    const prop = this.props.name;

    if (entity[prop]) {
      entity[prop].push(new Determinant());
      State.updateEntity({[prop]: entity[prop]});
    } else {
      State.updateEntity({[prop]: [new Determinant()]});
    }
  };

  addModifierToDeterminant = (determinant) => () => {
    determinant.modifiers.push(new Modifier());
    State.updateEntity({[this.props.name]: this.props.value});
  };

  updateModifier = modifier => newModifier => {
    modifier.updateWith(newModifier);
    State.updateEntity({[this.props.name]: this.props.value});
  };

  render() {
    const {
      t, name, value, modifierTypes = ModifierType.allOf(), types = DeterminantType.allOf()
    } = this.props;

    return <Grid container spacing={2} alignItems={"center"}>
      <Grid item>{t(name)}</Grid>
      <Grid item container spacing={2} alignItems={"center"}>
        {value && value.map(determinant => (
            <Grid item container spacing={2} alignItems={"center"} key={value}>
              <Grid item>
                <EnumSelect key={determinant.id + determinant.type}
                            label={t(name) + determinant.type}
                            data={types} value={determinant.type}
                            onChange={selected => this.update(determinant, {type: selected})}/>
              </Grid>
              <Grid item>
                <IntegerField key={determinant.id + 'value'} label={'value'}
                              value={determinant.value}
                              onChange={number => this.update(determinant, {value: number})}/>
              </Grid>
              {<Grid item container spacing={2} alignItems={"center"}>
                <Grid item>
                  {t('modifier')}
                </Grid>
                <Grid item>
                  {determinant.modifiers && determinant.modifiers.map(currentModifier => (
                      <Paper key={determinant.id + '_' + currentModifier.id}>
                        <ModifierField
                            id={determinant.id
                                + determinant.type
                                + currentModifier.id
                                + currentModifier.type}
                            value={currentModifier}
                            types={modifierTypes}/>
                      </Paper>))}
                </Grid>
                <Grid item>
                  <Button
                      onClick={this.addModifierToDeterminant(determinant)}>{t('newModifier')}</Button>
                </Grid>
              </Grid>}
              <IconButton key={determinant.id + determinant.type + 'remove'}
                          onClick={() => this.deleteItem(determinant)}><Remove/></IconButton>
            </Grid>))}
      </Grid>
      <Grid item>
        <Button onClick={this.addDeterminant}>{t('newDeterminant')}</Button>
      </Grid>
    </Grid>;
  }
}

export default withTranslation()(DeterminantField);