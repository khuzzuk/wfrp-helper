import Grid from "@material-ui/core/Grid";
import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import Determinant from "../../model/rule/Determinant";
import DiceRoll from "../../model/rule/DiceRoll";
import Modifier, {ModifierType} from "../../model/rule/Modifier";
import {State} from "../../state/State";
import EnumSelect from "./EnumSelect";
import IntegerField from "./IntegerField";

const determinantsNames = ['SPEED',
                           'BATTLE',
                           'SHOOTING',
                           'STRENGTH',
                           'DURABILITY',
                           'HEALTH',
                           'INITIATIVE',
                           'ATTACK',
                           'DEXTERITY',
                           'LEADER_SKILLS',
                           'INTELLIGENCE',
                           'CONTROL',
                           'WILL',
                           'CHARISMA',];

class RaceDeterminantsField extends Component {
  regenerateDeterminants = entity => {
    if (!entity.determinants || entity.determinants.length === 0) {
      determinantsNames.forEach(name => {
        const modifier = new Modifier();
        modifier.type  = ModifierType.DICE;

        const determinant = new Determinant();
        determinant.type  = name;
        determinant.modifiers.push(modifier);

        entity.determinants.push(determinant);
      })
    } else {
      entity.determinants.filter(determinant => !determinant.modifiers)
            .forEach(determinant => {
              determinant.modifiers = [new Modifier()]
            });
      entity.determinants.filter(determinant => determinant.modifiers.length === 0)
            .forEach(determinant => determinant.modifiers.push(new Modifier()));
    }
  };

  updateDiceType = determinant => type => {
    if (!type && determinant.modifiers[0].rolls.length === 1) {
      determinant.modifiers[0].rolls.length = 0;
    } else if (type && determinant.modifiers[0].rolls.length === 0) {
      determinant.modifiers[0].rolls.push(new DiceRoll());
      determinant.modifiers[0].rolls[0].dice = type;
    } else {
      determinant.modifiers[0].rolls[0].dice = type;
    }
    State.updateEntity(State.data.entity);
  };

  updateDiceRolls = determinant => rolls => {
    if (rolls === 0 && determinant.modifiers[0].rolls.length === 1) {
      determinant.modifiers[0].rolls.length = 0;
    } else if (rolls > 0 && determinant.modifiers[0].rolls.length === 0) {
      determinant.modifiers[0].rolls.push(new DiceRoll());
      determinant.modifiers[0].rolls[0].rolls = rolls;
    } else {
      determinant.modifiers[0].rolls[0].rolls = rolls;
    }
    State.updateEntity(State.data.entity);
  };

  updateBasicModifier = determinant => modifier => {
    determinant.modifiers[0].value = modifier;
    State.updateEntity(State.data.entity);
  };

  render() {
    const {t}    = this.props;
    const entity = State.data.entity;
    this.regenerateDeterminants(entity);

    const fields = entity.determinants.map(determinant => [
        <Grid item xs={1}>{t(determinant.type)}</Grid>,
        <Grid item xs={3}><EnumSelect name={'dice'}
                                      value={determinant.modifiers[0].rolls.length && determinant.modifiers[0].rolls[0].dice}
                                      editable
                                      onChange={this.updateDiceType(determinant)}/></Grid>,
        <Grid item xs={1}>{t('rolls')} <IntegerField value={determinant.modifiers[0].rolls.length && determinant.modifiers[0].rolls[0].rolls}
                                                     onChange={this.updateDiceRolls(determinant)}/></Grid>,
        <Grid item xs={1}>{t('plus')} <IntegerField value={determinant.modifiers[0].value}
                                                    onChange={this.updateBasicModifier(determinant)}/></Grid>]);

    return <Grid container spacing={2} alignItems={"center"}>
      {fields.map(field => <Grid item container xs={12} alignItems={"center"}>{field}</Grid>)}
    </Grid>;
  }
}

export default withTranslation()(RaceDeterminantsField);