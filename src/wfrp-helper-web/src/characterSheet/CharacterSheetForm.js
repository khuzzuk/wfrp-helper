import React, {Component} from "react";
import FrontCharacterSheet from "../img/A.png";
import {TextField} from "@material-ui/core";
import {withStyles} from '@material-ui/styles';

const formStyles = {
    backgroundStyle: {
        background: `url(${FrontCharacterSheet})`,
        fontFamily: 'wfrp',
        backgroundSize: 'cover',
        height: '1231px',
        //width: '100%'
        width: '1800px'
    },

    input: {
        fontFamily: 'wfrp'
    },

    nameField: {
        left: '35px',
        top: '35px',
    },
    raceField: {
        left: '35px',
        top: '35px',
    },
};

class CharacterSheetForm extends Component {
    state = {
        person: undefined
    };

    updatePerson = field => updates => {
        this.props.entity.updateWith({[field]: updates.target.value});
        this.props.onChange(this.props.entity);
    };

    render() {
        const {classes} = this.props;
        return <div className={classes.backgroundStyle}>
            <TextField className={classes.nameField} inputProps={{className: classes.input}} onChange={this.updatePerson('name')}/>
        </div>;
    }
}

export default withStyles(formStyles)(CharacterSheetForm);