import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import WeaponService from "../data/crafting/item/WeaponService";
import {DeterminantType} from "../data/rule/Determinant";

const weaponElementStyle = {
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

const weaponService = new WeaponService();

class WeaponElement extends Component {
    state = {
        damageText: ''
    };

    constructor(props: P, context: any) {
        super(props, context);
        weaponService.calculateMeleeDamage(this.props.weapon.id, text => this.setState({damageText: text}))
    }

    render() {
        const {classes, className, onContextMenu, weapon} = this.props;
        return <div className={className} onContextMenu={onContextMenu}>
            <div className={classes.itemName}>{weapon.name}</div>
            <div className={classes.itemVariable}>{weapon.getFinalValueForType(DeterminantType.INITIATIVE)}</div>
            <div className={classes.itemVariable}>{weapon.getFinalValueForType(DeterminantType.BATTLE)}</div>
            <div className={classes.damageText}>{this.state.damageText}</div>
            <div className={classes.itemVariable}>{weapon.getFinalValueForType(DeterminantType.PARRY)}</div>
        </div>;
    }
}

export default withStyles(weaponElementStyle)(WeaponElement)