import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GearService from "../data/crafting/item/GearService";
import {DeterminantType} from "../data/rule/Determinant";

const weaponElementStyle = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    itemName: {
        minWidth: 180,
        maxWidth: 180,
    },
    itemVariable: {
        minWidth: 51,
        maxWidth: 51,
        textAlign: 'center',
    },
    damageText: {
        minWidth: 51,
        maxWidth: 51,
        textAlign: 'center',
        fontSize: 12,
    },
};

const weaponService = new GearService();

class WeaponElement extends Component {
    state = {
        damageText: ''
    };

    updateDamageValue = () => {
        weaponService.calculateMeleeDamage(this.props.weapon.id, text => this.setState({
            damageText: text,
            weapon: this.props.weapon
        }))
    }

    render() {
        const {classes, customStyle, onContextMenu, weapon} = this.props;
        const currentStyle = {...classes, ...customStyle};
        if (weapon !== this.state.weapon) {
            this.updateDamageValue();
        }

        return <div className={currentStyle.itemContainer} onContextMenu={event => {
            event.preventDefault();
            onContextMenu(this.props.weapon);
        }}>
            <div className={currentStyle.itemName}>{weapon.name}</div>
            <div className={currentStyle.itemVariable}>{weapon.getFinalValueForType(DeterminantType.INITIATIVE)}</div>
            <div className={currentStyle.itemVariable}>{weapon.getFinalValueForType(DeterminantType.BATTLE)}</div>
            <div className={currentStyle.damageText}>{this.state.damageText}</div>
            <div className={currentStyle.itemVariable}>{weapon.getFinalValueForType(DeterminantType.PARRY)}</div>
        </div>;
    }
}

export default withStyles(weaponElementStyle)(WeaponElement)