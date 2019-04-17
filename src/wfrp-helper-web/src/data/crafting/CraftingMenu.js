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

    getMenuItems = () => {
        return [
            <BlueprintMenu key={'blueprint'} onClick={this.handleClose}
                           armorBlueprintService={this.props.armorBlueprintService} onArmorBlueprint={this.props.onArmorBlueprint}
                           meleeWeaponBlueprintService={this.props.meleeWeaponBlueprintService} onMeleeWeaponBlueprint={this.props.onMeleeWeaponBlueprint}/>,
            <MenuItem key={'resource'} onClick={this.showResourceCrud}>Resource</MenuItem>,
            <MenuItem key={'item'} onClick={this.showItemCrud}>Item</MenuItem>,
        ];
    };
}

export default CraftingMenu;