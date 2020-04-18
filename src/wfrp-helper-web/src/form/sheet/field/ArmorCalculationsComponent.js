import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GearService from "../../../client/GearService";
import {Placement} from "../../../model/crafting/Placement";
import CreatureArmorValues from "../../../model/creature/CreatureArmorValues";
import {State} from "../../../state/State";

const defaultComponentStyle = {
    position: 'absolute',
    width: 20,
    textAlign: 'center',
};
const defaultStyle = {
    container: {
        position: 'relative',
    },
    shield: {
        ...defaultComponentStyle,
        left: 130,
        top: 85,
    },
    head: {
        ...defaultComponentStyle,
        left: 15,
        top: 100,
    },
    rightHand: {
        ...defaultComponentStyle,
        left: 15,
        top: 170,
    },
    leftHand: {
        ...defaultComponentStyle,
        left: 155,
        top: 162,
    },
    torso: {
        ...defaultComponentStyle,
        left: 155,
        top: 230,
    },
    rightLeg: {
        ...defaultComponentStyle,
        left: 15,
        top: 295,
    },
    leftLeg: {
        ...defaultComponentStyle,
        left: 155,
        top: 295,
    },
};

const gearService = new GearService();

class ArmorCalculationsComponent extends Component {
    state = {
        armorValues: new CreatureArmorValues(),
    };

    updateArmorValues = () => {
        gearService.calculatePersonArmorValue(
            State.data.entity.armor.map(armor => armor.id),
            data => {
                const armorCalcs = new CreatureArmorValues();
                armorCalcs.updateWith(data);
                this.setState({armorValues: armorCalcs});
            }
        );
    };

    render() {
        const {classes, className, ...other} = this.props;
        if (State.data.entity.armor !== this.state.armor) {
            this.updateArmorValues();
        }
        return <div className={`${classes.container} ${className}`} {...other}>
            <p className={classes.shield}>{this.state.armorValues.getArmorValue(Placement.SHIELD)}</p>
            <p className={classes.head}>{this.state.armorValues.getArmorValue(Placement.HEAD)}</p>
            <p className={classes.rightHand}>{this.state.armorValues.getArmorValue(Placement.HAND)}</p>
            <p className={classes.leftHand}>{this.state.armorValues.getArmorValue(Placement.HAND)}</p>
            <p className={classes.torso}>{this.state.armorValues.getArmorValue(Placement.TORSO)}</p>
            <p className={classes.rightLeg}>{this.state.armorValues.getArmorValue(Placement.LEG)}</p>
            <p className={classes.leftLeg}>{this.state.armorValues.getArmorValue(Placement.LEG)}</p>
        </div>;
    }
}

export default withStyles(defaultStyle)(ArmorCalculationsComponent)