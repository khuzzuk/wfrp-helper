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
            data => console.log(data)
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
        </div>
    }
}

export default withStyles(defaultStyle)(ArmorCalculationsComponent)