import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleEntitySelect from "../crud/field/SimpleEntitySelect";
import MeleeWeapon from "../data/crafting/item/melee/MeleeWeapon";
import {List} from "@material-ui/core";
import WeaponElement from "./WeaponElement";

const fieldStyle = {
    selectComponent: {
        width: '100%'
    },
    itemsList: {
        height: 150,
        maxHeight: 150,
        paddingLeft: 10,
        paddingTop: 0,
        width: '100%',
        overflow: 'auto',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
};

const selectStyle = {
    placeholder: () => ({
        color: 'transparent'
    }),
    singleValue: () => ({
        color: 'transparent'
    }),
};

class MeleeWeaponField extends Component {

    removeWeapon = (event, weapon) => {
        event.preventDefault();
        this.props.onWeaponRemove(weapon);
    };

    getWeaponComponent = (weapon: MeleeWeapon) => {
        const {classes} = this.props;
        return <WeaponElement weapon={weapon} className={classes.itemContainer}
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

export default withStyles(fieldStyle)(MeleeWeaponField)