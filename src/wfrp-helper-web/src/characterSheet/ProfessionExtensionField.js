import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {Checkbox} from "@material-ui/core";
import {ModifierType} from "../data/rule/Modifier";

const fieldStyle = {
    fieldContainer: {
        position: 'relative'
    },
    extension: {
        position: 'absolute',
        top: '5px',
    },
    checkboxContainer: {
        position: 'absolute',
        right: '5px',
        display: 'flex',
        flexFlow: 'row',
        maxHeight: '10px'
    },
    checkbox: {
        height: '10px'
    }
};

class ProfessionExtensionField extends Component {
    render() {
        const {ext, classes, customClassName, ...other} = this.props;
        const professionValue = ext
            ? ext.modifiers.find(mod => mod.type === ModifierType.PROFESSION).value
            : '';

        return <div className={classes.fieldContainer + ' ' + customClassName} {...other}>
            <p className={classes.extension}>{professionValue}</p>
            <div className={classes.checkboxContainer}>
                <Checkbox/>
                <Checkbox/>
            </div>
        </div>;
    }
}

export default withStyles(fieldStyle)(ProfessionExtensionField);