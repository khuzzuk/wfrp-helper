import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import React from "react";
import BlueprintMenu from "./blueprint/BlueprintMenu";

class CraftingMenu extends MenuComponent {
    title = 'Crafting';

    getMenuItems = () => {
        return [
            <BlueprintMenu key={'blueprint'} onClick={this.handleClose}
                           armorBlueprintService={this.props.armorBlueprintService} onArmorBlueprint={this.props.onArmorBlueprint}
                           meleeWeaponBlueprintService={this.props.meleeWeaponBlueprintService} onMeleeWeaponBlueprint={this.props.onMeleeWeaponBlueprint}
                           rangedWeaponBlueprintService={this.props.rangedWeaponBlueprintService} onRangedWeaponBlueprint={this.props.onRangedWeaponBlueprint}/>,
            <MenuItem key={'resource'} onClick={this.showCrudAction(this.props.onResource, this.props.resourceService)}>Resource</MenuItem>,
            <MenuItem key={'item'} onClick={this.showCrudAction(this.props.onItem, this.props.itemService)}>Item</MenuItem>,
            <MenuItem key={'armorPattern'} onClick={this.showCrudAction(this.props.onArmorPattern, this.props.armorPatternService)}>Armor Pattern</MenuItem>,
            <MenuItem key={'armor'} onClick={this.showCrudAction(this.props.onArmor, this.props.armorService)}>Armor</MenuItem>,
            <MenuItem key={'meleeWeapon'} onClick={this.showCrudAction(this.props.onMeleeWeapon, this.props.meleeWeaponService)}>Melee weapon</MenuItem>,
            <MenuItem key={'rangedWeapon'} onClick={this.showCrudAction(this.props.onRangedWeapon, this.props.rangedWeaponService)}>Ranged weapon</MenuItem>,
            <MenuItem key={'jewelry'} onClick={this.showCrudAction(this.props.onJewelry, this.props.jewelryService)}>Jewelry</MenuItem>,
        ];
    };
}

export default CraftingMenu;