import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GearService from "../../../client/GearService";
import {DeterminantType} from "../../../model/rule/Determinant";
import {State} from "../../../state/State";
import {Collections} from "../../../util/Collections";

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
    };

    render() {
        const {name, classes, customStyle, weapon} = this.props;
        const currentStyle = {...classes, ...customStyle};
        if (weapon !== this.state.weapon) {
            this.updateDamageValue();
        }

        return <div className={currentStyle.itemContainer}
                    onContextMenu={event => {
                        event.preventDefault();
                        State.updateEntity({[name]: Collections.removeElement(State.data.entity[name], weapon)});
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