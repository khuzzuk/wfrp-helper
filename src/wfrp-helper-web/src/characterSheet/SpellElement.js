// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

const componentStyle = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    name: {
        minWidth: 155,
        maxWidth: 155,
    },
    level: {
        textAlign: 'center',
        minWidth: 47,
        maxWidth: 47,
    },
    manaCost: {
        textAlign: 'center',
        minWidth: 47,
        maxWidth: 47,
    },
    reach: {
        textAlign: 'center',
        minWidth: 47,
        maxWidth: 47,
    },
    duration: {
        textAlign: 'center',
        minWidth: 47,
        maxWidth: 47,
    },
    ingredients: {
        minWidth: 140,
        maxWidth: 140,
    },
    effect: {
        minWidth: 140,
        maxWidth: 140,
    },
};

class SpellElement extends Component {
    render() {
        const {
            customStyle, classes,
            spell, onContextMenu,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};
        const ingredientsText = spell.ingredients.map(item => item.name).join(', ');

        return (
            <div {...other} className={currentStyle.container}
                 onContextMenu={event => {onContextMenu(spell); event.preventDefault();}}>
                <div className={currentStyle.name}>{spell.name}</div>
                <div className={currentStyle.level}>{spell.level}</div>
                <div className={currentStyle.manaCost}>{spell.manaCost}</div>
                <div className={currentStyle.reach}>{spell.range}</div>
                <div className={currentStyle.duration}>{spell.durationTime.toString()}</div>
                <div className={currentStyle.ingredients}>{ingredientsText}</div>
                <div className={currentStyle.effect}>{spell.effect}</div>
            </div>
        );
    };
};

export default withStyles(componentStyle)(SpellElement);