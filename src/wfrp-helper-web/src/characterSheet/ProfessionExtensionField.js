import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {ModifierType} from "../data/rule/Modifier";
import Add from "@material-ui/icons/Add";

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
        flexWrap: 'wrap',
        maxWidth: 40
    },
};

const ExtMark = props => <Add style={{fontSize: 14, margin: -2}} {...props}/>;

class ProfessionExtensionField extends Component {
    render() {
        const {
            ext,
            currentDeterminant,
            classes,
            customClassName,
            ...other
        } = this.props;
        const professionValue = ext
            ? ext.modifiers.find(mod => mod.type === ModifierType.PROFESSION).value
            : '0';
        const extended = currentDeterminant ? currentDeterminant.getExperienceExtensions() : [];

        return <div className={`${classes.fieldContainer} ${customClassName}`} {...other}
                    onClick={() => console.log('click')}
                    onContextMenu={(e) => {e.preventDefault(); console.log('right click');}}>
            <p className={classes.extension}>{'+' + professionValue}</p>
            <div className={classes.checkboxContainer}>
                {extended.map(mod => <ExtMark/>)}
            </div>
        </div>;
    }
}

export default withStyles(fieldStyle)(ProfessionExtensionField);