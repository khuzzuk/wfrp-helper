import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CreatureArmorValues from "../data/creature/CreatureArmorValues";
import {Placement} from "../data/crafting/Placement";
import GearService from "../data/crafting/item/GearService";

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
        left: 140,
        top: 90,
    },
    head: {
        ...defaultComponentStyle,
        left: 28,
        top: 105,
    },
    rightHand: {
        ...defaultComponentStyle,
        left: 25,
        top: 180,
    },
    leftHand: {
        ...defaultComponentStyle,
        left: 165,
        top: 170,
    },
    torso: {
        ...defaultComponentStyle,
        left: 165,
        top: 235,
    },
    rightLeg: {
        ...defaultComponentStyle,
        left: 25,
        top: 300,
    },
    leftLeg: {
        ...defaultComponentStyle,
        left: 165,
        top: 300,
    },
};

const gearService = new GearService();

class ArmorCalculationsComponent extends Component {
    state = {
        armorValues: new CreatureArmorValues(),
    };


    constructor(props: P, context: any, state) {
        super(props, context);
        this.state = state ? state : this.state;
        gearService.calculatePersonArmorValue(
            this.props.entity.armor.map(armor => armor.id),
            data => {
                const armorCalcs = new CreatureArmorValues();
                armorCalcs.updateWith(data)
                this.setState({armorValues: armorCalcs});
            }
        );
    }

    render() {
        const {
            classes, className,
            entity,
            ...other
        } = this.props;
        return <div className={`${classes.container} ${className}`} {...other}>
            <p className={classes.shield}>{this.state.armorValues.getArmorValue(Placement.SHIELD)}</p>
            <p className={classes.head}>{this.state.armorValues.getArmorValue(Placement.HEAD)}</p>
            <p className={classes.rightHand}>{this.state.armorValues.getArmorValue(Placement.HAND)}</p>
            <p className={classes.leftHand}>{this.state.armorValues.getArmorValue(Placement.HAND)}</p>
            <p className={classes.torso}>{this.state.armorValues.getArmorValue(Placement.TORSO)}</p>
            <p className={classes.rightLeg}>{this.state.armorValues.getArmorValue(Placement.LEG)}</p>
            <p className={classes.leftLeg}>{this.state.armorValues.getArmorValue(Placement.LEG)}</p>
        </div>
    }
}

export default withStyles(defaultStyle)(ArmorCalculationsComponent)