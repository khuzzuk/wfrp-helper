import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import Add from "@material-ui/icons/Add";
import DeterminantService from "../../../client/DeterminantService";
import {ModifierType} from "../../../model/rule/Modifier";

const determinantService = new DeterminantService();

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
                {extended.map(mod => <ExtMark key={'' + mod.value + '-' + mod.type}/>)}
            </div>
        </div>;
    }
}

export default withStyles(fieldStyle)(ProfessionExtensionField);