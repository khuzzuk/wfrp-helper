import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleEntitySelect from "../crud/field/SimpleEntitySelect";

const weaponElementStyle = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    itemName: {
        minWidth: 190,
        maxWidth: 190,
    },
    itemVariable: {
        minWidth: 38,
        maxWidth: 38,
        textAlign: 'center',
    },
    itemData: {},
    ammunitionContainer: {}
};

class RangedWeaponElement extends Component {
    render() {
        const {classes, customStyle, onContextMenu, personRangedWeapon} = this.props;
        const currentStyle = {...classes, ...customStyle};
        const weapon = personRangedWeapon.rangedWeapon;
        const weaponType = weapon.type;
        let prepareTime = weaponType.prepareTime.toString();

        return <div className={currentStyle.itemContainer} onContextMenu={event => {
            event.preventDefault();
            onContextMenu(weapon);
        }}>
            <div className={currentStyle.itemData}>
                <div className={currentStyle.itemName}>{weapon.name}</div>
                <div className={currentStyle.itemVariable}>{weaponType.minimumRange}</div>
                <div className={currentStyle.itemVariable}>{weaponType.mediumRange}</div>
                <div className={currentStyle.itemVariable}>{weaponType.maximumRange}</div>
                <div className={currentStyle.itemVariable}>{weaponType.damage.value}</div>
                <div className={currentStyle.itemVariable}>{prepareTime}</div>
            </div>
            <div>
                {
                    if
                }
                <SimpleEntitySelect
            </div>
        </div>;
    }
}

export default withStyles(weaponElementStyle)(RangedWeaponElement)