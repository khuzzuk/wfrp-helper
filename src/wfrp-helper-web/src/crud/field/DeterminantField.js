import React, {Component} from "react";

class DeterminantField extends Component {

    deleteItem = (item) => {
        const value = this.props.value;
        value.splice(value.indexOf(item), 1);
    };

    render(): React.ReactNode {
        const {value} = this.props;

        return <div>

        </div>;
    }
}

export default DeterminantField;