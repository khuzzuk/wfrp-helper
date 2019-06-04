import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import RangedWeapon from "../data/crafting/item/ranged/RangedWeapon";
import SimpleEntitySelect from "../crud/field/SimpleEntitySelect";
import DeterminantService from "../data/rule/DeterminantService";
import {DeterminantType} from "../data/rule/Determinant";

const fieldStyle = {
    selectComponent: {
        width: '100%'
    },
    itemsList: {
        height: 150,
        maxHeight: 150,
        paddingLeft: 10,
        width: '100%',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    itemName: {
        minWidth: 180,
        maxWidth: 180,
    },
    itemVariable: {
        minWidth: 50,
        maxWidth: 50,
        textAlign: 'center',
    }
};

const selectStyle = {
    placeholder: () => ({
        color: 'transparent'
    }),
    singleValue: () => ({
        color: 'transparent'
    }),
};

class RangedWeaponField extends Component {

    removeWeapon = (event, weapon) => {
        event.preventDefault();
        this.props.onWeaponRemove(weapon);
    };

    getWeaponComponent = (weapon: RangedWeapon) => {
        const {classes} = this.props;
        return <div className={classes.itemContainer}>
            <div className={classes.itemName} onContextMenu={event => this.removeWeapon(event, weapon)}>{weapon.name}</div>
            <div className={classes.itemVariable}>{'' + DeterminantService.sumValueByTypeIn(weapon.determinants, DeterminantType.INITIATIVE)}</div>
        </div>;
    };

    render() {
        const {
            classes, value, data,
            onWeaponAdd, onWeaponRemove,
            ...other
        } = this.props;

        return <div {...other}>
            <SimpleEntitySelect className={classes.selectComponent} customStyle={selectStyle} options={data}
                                onChange={onWeaponAdd}/>
            <div className={classes.itemsList}>
                {
                    value.map(this.getWeaponComponent)
                }
            </div>
        </div>;
    }
}

export default withStyles(fieldStyle)(RangedWeaponField)