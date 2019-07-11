import React from "react";
import MenuComponent from "../../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

export default class BlueprintMenu extends MenuComponent {
    title = 'Blueprints';

    getMenuItems = () => {
        return [
            <MenuItem key={'armorBlueprint'} onClick={this.createOnClick(this.props.onArmorBlueprint)}>Armor</MenuItem>,
            <MenuItem key={'meleeWeaponBlueprint'} onClick={this.createOnClick(this.props.onMeleeWeaponBlueprint)}>Melee weapon</MenuItem>,
            <MenuItem key={'rangedWeaponBlueprint'} onClick={this.createOnClick(this.props.onRangedWeaponBlueprint)}>Ranged weapon</MenuItem>
        ];
    };
}