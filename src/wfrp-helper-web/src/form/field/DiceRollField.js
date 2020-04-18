import React, {Component} from "react";
import EnumSelect from "./EnumSelect";
import IntegerField from "./IntegerField";
import {State} from "../../state/State";
import {Dice} from "../../model/rule/DiceRoll";

export default class DiceRollField extends Component {
    updateDiceRoll = updates => {
        this.props.value.updateWith(updates);
        State.update({currentDiceRollEdit: this.props.value});
    };

    render() {
        const {value, id} = this.props;

        return <div key={id}>
            <EnumSelect key={id + '_type'}
                        label={'dice'}
                        data={Dice.allOf()}
                        value={value.dice}
                        onChange={selected => this.updateDiceRoll({dice: selected})}/>
            <IntegerField key={id + '_rolls'}
                          label={'rolls'}
                          value={value.rolls}
                          onChange={number => this.updateDiceRoll({rolls: number})}/>
        </div>;
    }
}