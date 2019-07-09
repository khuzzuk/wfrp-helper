import React, {PureComponent} from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const defaultClass = {
    input: {
        backgroundColor: 'transparent',
        border: 0,
        width: '100%',
        fontFamily: 'wfrp',
        fontSize: '24px',
        textAlign: 'center',
        outline: 'none',
    },
};

class SimpleTextField extends PureComponent {
    updateText = onChange => event => {
        onChange(event.target.value);
    };
    updateInt = onChange => event => {
        let number = parseInt(event.target.value);
        if (number || number === 0) onChange(number)
    };
    updateFloat = onChange => event => {
        let number = parseFloat(event.target.value);
        if (number || number === 0) onChange(number)
    };

    createOnChange = (variant, onChange) => {
        switch (variant) {
            case TextFieldType.INT:
                return this.updateInt(onChange);
            case TextFieldType.FLOAT:
                return this.updateFloat(onChange);
            default:
                return this.updateText(onChange);
        }
    };

    render() {
        const {onChange, classes, customStyle, value, variant, ...other} = this.props;
        const currentStyle = {...classes, ...customStyle};

        return <div {...other}>
            <input className={currentStyle.input} value={value}
                   onChange={this.createOnChange(variant, onChange)}/>
        </div>;
    }
}

export default withStyles(defaultClass)(SimpleTextField);

export const TextFieldType = {
    TEXT: 'TEXT',
    INT: 'INT',
    FLOAT: 'FLOAT',
};