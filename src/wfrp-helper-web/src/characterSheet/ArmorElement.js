import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GearService from "../data/crafting/item/GearService";

const elementStyle = {
    itemName: {
        minWidth: 145,
        maxWidth: 145,
    },
    itemPlacement: {
        minWidth: 200,
        maxWidth: 200,
        textAlign: 'center',
    },
    armorValue: {
        minWidth: 60,
        maxWidth: 60,
        textAlign: 'center',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
};

const gearService = new GearService();

class ArmorElement extends Component {
    state = {
        damageText: ''
    };

    constructor(props: P, context: any) {
        super(props, context);
        //weaponService.calculateMeleeDamage(this.props.weapon.id, text => this.setState({damageText: text}))
    }

    render() {
        const {classes, customStyle, onContextMenu, armor} = this.props;
        const currentStyle = {...classes, ...customStyle};

        return <div className={currentStyle.itemContainer} onContextMenu={event => {
            event.preventDefault();
            onContextMenu(armor);
        }}>
            <div className={currentStyle.itemName}>{armor.name}</div>
            <div className={currentStyle.itemPlacement}>{armor.type.placement}</div>
            <div className={currentStyle.armorValue}>{'1'}</div>
        </div>;
    }
}

export default withStyles(elementStyle)(ArmorElement)