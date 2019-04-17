import React, {Component} from "react";
import EnumSelect from "./EnumSelect";
import IntegerField from "./IntegerField";
import {ModifierType} from "../../data/rule/Modifier";

export default class ModifierField extends Component {

    update = updates => {
        this.props.value.updateWith(updates);
        this.props.onChange(this.props.value)
    };

    render() {
        const {value, key} = this.props;
        const types = this.props.types || ModifierType.allOf();

        return <div>
            <IntegerField key={key + '_value'} label={'value'}
                          value={value.value}
                          onChange={number => this.update({value: number})}/>
            <EnumSelect key={key + '_type'} label={'Modifier type ' + value.id}
                        data={types} value={value.type}
                        onChange={selected => this.update({type: selected})}/>
        </div>;
    }
}
