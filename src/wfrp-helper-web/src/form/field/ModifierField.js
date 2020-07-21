import React, {Component} from "react";
import EnumSelect from "./EnumSelect";
import IntegerField from "./IntegerField";
import {Button} from "@material-ui/core";
import DiceRollField from "./DiceRollField";
import {ModifierType} from "../../model/rule/Modifier";
import {State} from "../../state/State";
import DiceRoll from "../../model/rule/DiceRoll";
import {withTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";

class ModifierField extends Component {

    update = updates => {
        this.props.value.updateWith(updates);
        State.update({currentModifierEdit: this.props.value});
    };

    onAddDiceRoll = () => {
        this.props.value.rolls.push(new DiceRoll());
        State.update({currentModifierEdit: this.props.value});
    };

    render() {
        const {
            t,
            name,
            value,
            label = t(name),
            id,
            types = ModifierType.allOf(),
            editable
        } = this.props;

        let dices = <div/>;
        if (value.type === ModifierType.DICE) {
            dices = <Grid item>
                {
                    value.rolls.map(diceRoll =>
                        <DiceRollField id={id} key={id} value={diceRoll}
                                       onChange={() => State.update({currentModifierEdit: value})}
                                       editable={editable}/>
                    )
                }
                {editable ?
                    <Button onClick={this.onAddDiceRoll}>{t('newDice')}</Button> :
                    <div/>
                }
            </Grid>;
        }

        return <Grid container item spacing={2} alignItems={"center"}>
            <Grid item>
                <IntegerField key={id + '_value'} label={label + ' – ' + t('value')}
                              value={value.value}
                              onChange={number => this.update({value: number})}
                              InputProps={{readOnly: !editable}}/>
            </Grid>
            <Grid item>
                <EnumSelect key={id || name + '_type'} label={t('modifierType') + ' ' + name ? t(name) : value.id}
                            data={types} value={value.type}
                            onChange={selected => this.update({type: selected})}
                            editable={editable}/>
            </Grid>
            {dices}
        </Grid>;
    }
}

export default withTranslation()(ModifierField);