import React, {Component} from "react";
import EnumSelect from "./EnumSelect";
import IntegerField from "./IntegerField";
import {ModifierType} from "../../data/rule/Modifier";
import DiceRollField from "./DiceRollField";
import {Button} from "@material-ui/core";
import DiceRoll from "../../data/rule/DiceRoll";

export default class ModifierField extends Component {

    update = updates => {
        this.props.value.updateWith(updates);
        this.props.onChange(this.props.value)
    };

    onAddDiceRoll = () => {
        this.props.value.rolls.push(new DiceRoll());
        this.props.onChange(this.props.value)
    };

    render() {
        const {
            value, key,
            types = ModifierType.allOf()
        } = this.props;

        let dices = <div/>;
        if (value.type === ModifierType.DICE) {
            dices = <div>
                {
                    value.rolls.map(diceRoll =>
                        <DiceRollField key={key + '_dice'}
                                       value={diceRoll}
                                       onChange={() => this.props.onChange(this.props.value)}/>
                    )
                }
                <Button onClick={this.onAddDiceRoll}>New dice</Button>
            </div>;
        }

        return <div>
            <IntegerField key={key + '_value'} label={'value'}
                          value={value.value}
                          onChange={number => this.update({value: number})}/>
            <EnumSelect key={key + '_type'} label={'Modifier type ' + value.id}
                        data={types} value={value.type}
                        onChange={selected => this.update({type: selected})}/>
            {dices}
        </div>;
    }
}
