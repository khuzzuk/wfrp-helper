import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import RangedWeapon from "../data/crafting/item/ranged/RangedWeapon";
import SimpleEntitySelect from "../crud/field/SimpleEntitySelect";
import DeterminantService from "../data/rule/DeterminantService";
import {DeterminantType} from "../data/rule/Determinant";
import RangedWeaponElement from "./RangedWeaponElement";
import {List} from "@material-ui/core";

const fieldStyle = {
    selectComponent: {
        width: '100%'
    },
    itemsList: {
        height: 150,
        maxHeight: 150,
        paddingLeft: 10,
        width: '100%',
        overflow: 'auto',
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
        return <RangedWeaponElement className={classes.itemContainer} weapon={weapon}
                                    onContextMenu={event => this.removeWeapon(event, weapon)}/>;
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
            <List className={classes.itemsList}>
                {
                    value.map(this.getWeaponComponent)
                }
            </List>
        </div>;
    }
}

export default withStyles(fieldStyle)(RangedWeaponField)