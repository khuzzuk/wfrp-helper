import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import React from "react";
import BlueprintMenu from "./blueprint/BlueprintMenu";
import {store} from "../../state";

class CraftingMenu extends MenuComponent {
    title = 'Crafting';

    getMenuItems = () => {
        const {onCrud} = this.props;
        return [
            <BlueprintMenu key={'blueprint'} onClick={this.handleClose} onCrud={onCrud}/>,
            <MenuItem key={'resource'} onClick={this.showCrudAction(onCrud, store.resourceService)}>Surowce</MenuItem>,
            <MenuItem key={'item'} onClick={this.showCrudAction(onCrud, store.itemService)}>Ekwipunek</MenuItem>,
            <MenuItem key={'armorPattern'} onClick={this.showCrudAction(onCrud, store.armorPatternService)}>Wzór pancerza</MenuItem>,
            <MenuItem key={'armor'} onClick={this.showCrudAction(onCrud, store.armorService)}>Pancerz</MenuItem>,
            <MenuItem key={'meleeWeapon'} onClick={this.showCrudAction(onCrud, store.meleeWeaponService)}>Broń ręczna</MenuItem>,
            <MenuItem key={'rangedWeapon'} onClick={this.showCrudAction(onCrud, store.rangedWeaponService)}>Broń dystansowa</MenuItem>,
            <MenuItem key={'jewelry'} onClick={this.showCrudAction(onCrud, store.jewelryService)}>Biżuteria</MenuItem>,
        ];
    };
}

export default CraftingMenu;