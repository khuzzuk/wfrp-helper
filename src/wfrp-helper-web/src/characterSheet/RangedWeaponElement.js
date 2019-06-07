import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const weaponElementStyle = {
    itemName: {
        minWidth: 190,
        maxWidth: 190,
    },
    itemVariable: {
        minWidth: 38,
        maxWidth: 38,
        textAlign: 'center',
    },
};

class RangedWeaponElement extends Component {
    render() {
        const {classes, className, onContextMenu, weapon} = this.props;
        const weaponType = weapon.type;
        let prepareTime = weaponType.prepareTime.toString();
        return <div className={className} onContextMenu={onContextMenu}>
            <div className={classes.itemName}>{weapon.name}</div>
            <div className={classes.itemVariable}>{weaponType.minimumRange}</div>
            <div className={classes.itemVariable}>{weaponType.mediumRange}</div>
            <div className={classes.itemVariable}>{weaponType.maximumRange}</div>
            <div className={classes.itemVariable}>{weaponType.damage.value}</div>
            <div className={classes.itemVariable}>{prepareTime}</div>
        </div>;
    }
}

export default withStyles(weaponElementStyle)(RangedWeaponElement)