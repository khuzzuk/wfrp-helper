import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GearService from "../data/crafting/item/GearService";
import {Placement} from "../data/crafting/Placement";

const elementStyle = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    itemName: {
        minWidth: 145,
        maxWidth: 145,
    },
    itemPlacement: {
        minWidth: 205,
        maxWidth: 205,
        textAlign: 'center',
    },
    armorValue: {
        minWidth: 50,
        maxWidth: 50,
        textAlign: 'center',
    },
};

const gearService = new GearService();

class ArmorElement extends Component {
    state = {
        armorValue: ''
    };

    constructor(props: P, context: any) {
        super(props, context);
        gearService.calculateArmorValue(this.props.armor.id, text => this.setState({armorValue: text}))
    }

    render() {
        const {classes, customStyle, onContextMenu, armor} = this.props;
        const currentStyle = {...classes, ...customStyle};

        return <div className={currentStyle.itemContainer} onContextMenu={event => {
            event.preventDefault();
            onContextMenu(armor);
        }}>
            <div className={currentStyle.itemName}>{armor.name}</div>
            <div className={currentStyle.itemPlacement}>{Placement.toRepresentation(armor.type.placement)}</div>
            <div className={currentStyle.armorValue}>{this.state.armorValue}</div>
        </div>;
    }
}

export default withStyles(elementStyle)(ArmorElement)