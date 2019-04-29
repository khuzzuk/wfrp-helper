import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import React from "react";
import BlueprintMenu from "./blueprint/BlueprintMenu";

class CraftingMenu extends MenuComponent {
    title = 'Crafting';

    showResourceCrud = () => {
        this.handleClose();
        this.props.onResource();
        this.props.resourceService.retrieveData();
    };

    showItemCrud = () => {
        this.handleClose();
        this.props.onItem();
        this.props.itemService.retrieveData();
    };

    showArmorPatternCrud = () => {
        this.handleClose();
        this.props.onArmorPattern();
        this.props.armorPatternService.retrieveData();
    };

    showArmorCrud = () => {
        this.handleClose();
        this.props.onArmor();
        this.props.armorService.retrieveData();
    };

    showMeleeWeaponCrud = () => {
        this.handleClose();
        this.props.onMeleeWeapon();
        this.props.meleeWeaponService.retrieveData();
    };

    showRangedWeaponCrud = () => {
        this.handleClose();
        this.props.onRangedWeapon();
        this.props.rangedWeaponService.retrieveData();
    };

    getMenuItems = () => {
        return [
            <BlueprintMenu key={'blueprint'} onClick={this.handleClose}
                           armorBlueprintService={this.props.armorBlueprintService} onArmorBlueprint={this.props.onArmorBlueprint}
                           meleeWeaponBlueprintService={this.props.meleeWeaponBlueprintService} onMeleeWeaponBlueprint={this.props.onMeleeWeaponBlueprint}
                           rangedWeaponBlueprintService={this.props.rangedWeaponBlueprintService} onRangedWeaponBlueprint={this.props.onRangedWeaponBlueprint}/>,
            <MenuItem key={'resource'} onClick={this.showResourceCrud}>Resource</MenuItem>,
            <MenuItem key={'item'} onClick={this.showItemCrud}>Item</MenuItem>,
            <MenuItem key={'armorPattern'} onClick={this.showArmorPatternCrud}>Armor pattern</MenuItem>,
            <MenuItem key={'armor'} onClick={this.showArmorCrud}>Armor</MenuItem>,
            <MenuItem key={'meleeWeapon'} onClick={this.showMeleeWeaponCrud}>Melee weapon</MenuItem>,
            <MenuItem key={'rangedWeapon'} onClick={this.showRangedWeaponCrud}>Ranged weapon</MenuItem>,
            <MenuItem key={'jewelry'} onClick={this.showCrudAction(this.props.onJewelry, this.props.jewelryService)}>Jewelry</MenuItem>,
        ];
    };
}

export default CraftingMenu;