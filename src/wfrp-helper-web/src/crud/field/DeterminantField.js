import React, {Component} from "react";
import {Button} from "@material-ui/core";
import Determinant, {DeterminantType} from "../../data/rule/Determinant";
import EnumSelect from "./EnumSelect";
import IntegerField from "./IntegerField";

class DeterminantField extends Component {

    deleteItem = (item) => {
        const value = this.props.value;
        value.splice(value.indexOf(item), 1);
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

    render() {
        const {value} = this.props;
        const types = DeterminantType.allOf();

        return <div>
            {
                value && value.map(determinant => ([
                        <EnumSelect key={determinant.id} label={'Determinant ' + determinant.id}
                                    data={types} value={determinant.type}
                                    onChange={selected => this.update(determinant, {type: selected})}/>,
                        <IntegerField key={determinant.id + 'value'} label={'value'}
                                      value={determinant.value}
                                      onChange={number => this.update(determinant, {value: number})}/>
                    ]
                ))
            }
            <Button onClick={this.addDeterminant}>Add</Button>
        </div>;
    }
}

export default DeterminantField;