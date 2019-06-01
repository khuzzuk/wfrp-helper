import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import {ModifierType} from "../data/rule/Modifier";
import Add from "@material-ui/icons/Add";
import DeterminantService from "../data/rule/DeterminantService";

const determinantService = new DeterminantService();

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

    addExtension = () => {
        determinantService.addExperienceExtension(this.props.ext, this.props.onChange);
    };

    removeExtension = () => {
        determinantService.removeExperienceExtension(this.props.ext, this.props.onChange);
    };

    render() {
        const {
            ext,
            classes,
            customClassName,
            onChange,
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

        return <div className={`${classes.fieldContainer} ${customClassName}`} {...other}
                    onClick={this.addExtension}
                    onContextMenu={(e) => {e.preventDefault(); this.removeExtension();}}>
            <p className={classes.extension}>{'+' + professionValue}</p>
            <div className={classes.checkboxContainer}>
                {extended.map(mod => <ExtMark/>)}
            </div>
        </div>;
    }
}

export default withStyles(fieldStyle)(ProfessionExtensionField);