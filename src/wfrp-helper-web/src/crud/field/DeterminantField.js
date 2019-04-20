import React, {Component} from "react";
import {Button, List, ListItem} from "@material-ui/core";
import Determinant, {DeterminantType} from "../../data/rule/Determinant";
import EnumSelect from "./EnumSelect";
import IntegerField from "./IntegerField";
import ModifierField from "./ModifierField";
import Modifier, {ModifierType} from "../../data/rule/Modifier";

class DeterminantField extends Component {

    deleteItem = (item) => {
        const value = this.props.value;
        value.splice(value.indexOf(item), 1);
        this.props.onChange(this.props.value);
    };

    update = (determinant, updates) => {
        determinant.updateWith(updates);
        this.props.onChange(this.props.value)
    };

    addDeterminant = () => {
        if (this.props.value) {
            this.props.value.push(new Determinant());
            this.props.onChange(this.props.value);
        } else {
            this.props.onChange([new Determinant()]);
        }
    };

    addModifierToDeterminant = (determinant) => () => {
        determinant.modifiers.push(new Modifier());
        this.props.onChange(this.props.value);
    };

    updateModifier = modifier => newModifier => {
        modifier.updateWith(newModifier);
        this.props.onChange(this.props.value);
    };

    render() {
        const {
            value,
            modifierTypes = ModifierType.allOf()
        } = this.props;
        const types = DeterminantType.allOf();

        return <List>
            {
                value && value.map(determinant => (
                    <ListItem>
                        <EnumSelect key={determinant.id + determinant.type} label={'Determinant ' + determinant.id}
                                    data={types} value={determinant.type}
                                    onChange={selected => this.update(determinant, {type: selected})}/>
                        <IntegerField key={determinant.id + 'value'} label={'value'}
                                      value={determinant.value}
                                      onChange={number => this.update(determinant, {value: number})}/>
                        {
                            <List>
                                {determinant.modifiers && determinant.modifiers.map(currentModifier => (
                                    <ListItem>
                                        <ModifierField
                                            key={determinant.id + determinant.type + currentModifier.id + currentModifier.type}
                                            value={currentModifier}
                                            types={modifierTypes}
                                            onChange={this.updateModifier(currentModifier)}/>
                                    </ListItem>
                                ))}
                                <ListItem>
                                    <Button onClick={this.addModifierToDeterminant(determinant)}>Add</Button>
                                </ListItem>
                            </List>
                        }
                        <Button key={determinant.id + determinant.type + 'remove'}
                                onClick={() => this.deleteItem(determinant)}>Remove</Button>
                    </ListItem>
                ))
            }
            <Button onClick={this.addDeterminant}>New Determinant</Button>
        </List>;
    }
}

export default DeterminantField;