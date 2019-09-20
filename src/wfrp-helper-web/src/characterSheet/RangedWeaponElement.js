import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleEntitySelect from "../crud/field/SimpleEntitySelect";
import SimpleTextField, {TextFieldType} from "../crud/field/SimpleTextField";

const weaponElementStyle = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'column'
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
    itemData: {
        display: 'flex',
        flexDirection: 'row',
    },
    ammunitionContainer: {
        minWidth: 170,
        maxWidth: 170,
        marginLeft: 10,
        minHeight: 50,
        maxHeight: 50,
        display: 'flex',
    },
    ammunitionSelect: {
        minWidth: 140,
        maxWidth: 140,
        minHeight: 50,
        maxHeight: 50,
    },
    ammunitionAmountField: {
        minWidth: 40,
        maxWidth: 40,
    }
};

class RangedWeaponElement extends Component {
    render() {
        const {
            classes,
            customStyle,
            onContextMenu,
            personRangedWeapon,
            personService,
            onAmmunition,
            onAmmunitionAmount,
            onAmmunitionRemove,
        } = this.props;
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
            <div className={currentStyle.ammunitionContainer}>
                <SimpleEntitySelect className={currentStyle.ammunitionSelect}
                                    options={personService.ammunitions}
                                    value={personRangedWeapon.ammunition}
                                    onChange={onAmmunition}/>
                <div onContextMenu={event => {
                    event.preventDefault();
                    onAmmunitionRemove(personRangedWeapon);
                }}>
                    {
                        personRangedWeapon.ammunition ?
                            <SimpleTextField className={currentStyle.ammunitionAmountField}
                                             value={personRangedWeapon.ammunitionAmount}
                                             variant={TextFieldType.INT}
                                             onChange={onAmmunitionAmount}/> :
                            <div/>
                    }
                </div>
            </div>
        </div>;
    }
}

export default withStyles(weaponElementStyle)(RangedWeaponElement)