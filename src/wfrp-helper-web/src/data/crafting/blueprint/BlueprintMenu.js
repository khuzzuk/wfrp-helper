import React from "react";
import MenuComponent from "../../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

export default class BlueprintMenu extends MenuComponent {
    title = 'Blueprints';

    showArmorBlueprintCrud = () => {
        this.handleClose();
        this.props.onClick();
        this.props.onArmorBlueprint();
        this.props.armorBlueprintService.retrieveData();
    };

    showMeleeWeaponBlueprintCrud = () => {
        this.handleClose();
        this.props.onClick();
        this.props.onMeleeWeaponBlueprint();
        this.props.meleeWeaponBlueprintService.retrieveData();
    };

    showRangedWeaponBlueprintCrud = () => {
        this.handleClose();
        this.props.onClick();
        this.props.onRangedWeaponBlueprint();
        this.props.rangedWeaponBlueprintService.retrieveData();
    };

    getMenuItems = () => {
        return [
            <MenuItem key={'armorBlueprint'} onClick={this.showArmorBlueprintCrud}>Armor</MenuItem>,
            <MenuItem key={'meleeWeaponBlueprint'} onClick={this.showMeleeWeaponBlueprintCrud}>Melee weapon</MenuItem>,
            <MenuItem key={'rangedWeaponBlueprint'} onClick={this.showRangedWeaponBlueprintCrud}>Ranged weapon</MenuItem>
        ];
    };
}