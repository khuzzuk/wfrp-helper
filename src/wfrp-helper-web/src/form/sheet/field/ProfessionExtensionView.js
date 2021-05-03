import Add from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/styles";
import React, {Component} from "react";
import {ModifierType} from "../../../model/rule/Modifier";

const fieldStyle = {
    fieldContainer: {
        position: 'relative'
    },
    extension: {
        position: 'absolute',
        top: '-10px',
        textAlign: 'center',
        width: '100%'
    },
    checkboxContainer: {
        position: 'absolute',
        right: '5px',
        display: 'flex',
        flexFlow: 'row',
        flexWrap: 'wrap',
        maxWidth: 40,
        zIndex: 1
    },
};

const ExtMark = props => <Add style={{fontSize: 14, margin: -2}} {...props}/>;

class ProfessionExtensionField extends Component {
    render() {
        const {
            ext,
            classes,
            customClassName,
            ...other
        } = this.props;

        let professionValue = '0';
        let extended = [];

        if (ext) {
            extended = ext.getExperienceExtensions();
            const professionModifier = ext ? ext.modifiers.find(mod => mod.type === ModifierType.PROFESSION) : null;

            if (professionModifier) {
              professionValue = professionModifier.value;
            }
        }

        return <div className={`${classes.fieldContainer} ${customClassName}`} {...other}>
            <p className={classes.extension}>{'+' + professionValue}</p>
            <div className={classes.checkboxContainer}>
                {extended.map(mod => <ExtMark key={`${mod.id}-${mod.value}-${mod.type}`}/>)}
            </div>
        </div>;
    }
}

export default withStyles(fieldStyle)(ProfessionExtensionField);