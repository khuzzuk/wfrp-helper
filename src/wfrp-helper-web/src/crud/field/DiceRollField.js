import React, {Component} from "react";
import EnumSelect from "./EnumSelect";
import {Dice} from "../../data/rule/DiceRoll";
import IntegerField from "./IntegerField";

export default class DiceRollField extends Component {
    updateDiceRoll = updates => {
        this.props.value.updateWith(updates);
        this.props.onChange(this.props.value);
    };

    render() {
        const {value, key} = this.props;

        return <div>
            <EnumSelect key={key + '_type'}
                        label={'dice'}
                        data={Dice.allOf()}
                        value={value.dice}
                        onChange={selected => this.updateDiceRoll({dice: selected})}/>
            <IntegerField key={key + '_rolls'}
                          label={'rolls'}
                          value={value.rolls}
                          onChange={number => this.updateDiceRoll({rolls: number})}/>
        </div>;
    }
}