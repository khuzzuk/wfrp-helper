import React, {Component} from "react";
import {FormLabel} from "@material-ui/core";
import EnumSelect from "./EnumSelect";
import {ActionType} from "../../data/rule/ActionTime";
import IntegerField from "./IntegerField";

export default class ActionTimeField extends Component {
    onUpdate = updates => {
        Object.assign(this.props.value, updates);
        this.props.onChange(this.props.value);
    };

    render() {
        const {value, label} = this.props;

        return <div>
            <FormLabel>{label}</FormLabel>
            <EnumSelect key={'actionType'}
                        label={'type'}
                        data={ActionType.allOf()}
                        value={value.type}
                        onChange={type => this.onUpdate({type: type})}/>
            <IntegerField key={'amount'}
                          label={'amount'}
                          value={value.amount} onChange={amount => this.onUpdate({amount: amount})}/>
        </div>;
    }
}