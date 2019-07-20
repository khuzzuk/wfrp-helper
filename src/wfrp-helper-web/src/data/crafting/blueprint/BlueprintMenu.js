import React from "react";
import MenuComponent from "../../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import {store} from "../../../state";

export default class BlueprintMenu extends MenuComponent {
    title = 'Blueprints';

    getMenuItems = () => {
        return [
            <MenuItem key={'armorBlueprint'}
                      onClick={this.createOnClick(this.showCrudAction(this.props.onArmorBlueprint, store.armorBlueprintService))}>
                Armor</MenuItem>,
            <MenuItem key={'meleeWeaponBlueprint'}
                      onClick={this.createOnClick(this.showCrudAction(this.props.onMeleeWeaponBlueprint, store.meleeWeaponBlueprintService))}>Melee
                weapon</MenuItem>,
            <MenuItem key={'rangedWeaponBlueprint'}
                      onClick={this.createOnClick(this.showCrudAction(this.props.onRangedWeaponBlueprint, store.rangedWeaponBlueprintService))}>Ranged
                weapon</MenuItem>
        ];
    };
}