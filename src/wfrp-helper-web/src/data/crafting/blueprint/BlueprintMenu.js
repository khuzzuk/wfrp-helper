import React from "react";
import MenuComponent from "../../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

export default class BlueprintMenu extends MenuComponent {
    title = 'Blueprints';

    getMenuItems = () => {
        return [
            <MenuItem key={'armorBlueprint'} onClick={this.showCrudAction(this.props.onArmorBlueprint, this.props.armorBlueprintService)}>Armor</MenuItem>,
            <MenuItem key={'meleeWeaponBlueprint'} onClick={this.showCrudAction(this.props.onMeleeWeaponBlueprint, this.props.meleeWeaponBlueprintService)}>Melee weapon</MenuItem>,
            <MenuItem key={'rangedWeaponBlueprint'} onClick={this.showCrudAction(this.props.onRangedWeaponBlueprint, this.props.rangedWeaponBlueprintService)}>Ranged weapon</MenuItem>
        ];
    };
}