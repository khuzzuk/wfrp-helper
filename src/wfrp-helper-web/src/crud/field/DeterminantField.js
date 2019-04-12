import React, {Component} from "react";
import {Button} from "@material-ui/core";
import Determinant, {DeterminantType} from "../../data/rule/Determinant";
import EnumSelect from "./EnumSelect";

class DeterminantField extends Component {

    deleteItem = (item) => {
        const value = this.props.value;
        value.splice(value.indexOf(item), 1);
    };

    addDeterminant = () => {
        this.props.value.push(new Determinant());
        this.props.onChange({...this.props.value})
    };

    render(): React.ReactNode {
        const {value} = this.props;
        const types = DeterminantType.allOf();

        return <div>
            {
                value.map(determinant => (
                    <EnumSelect key={determinant.id} label={'Determinant Type'}
                                data={types} value={determinant.type}/>
                ))
            }
            <Button onClick={this.addDeterminant}>Add</Button>
        </div>;
    }
}

export default DeterminantField;