import React from "react";
import MenuComponent from "../../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import {store} from "../../../state";

export default class BlueprintMenu extends MenuComponent {
    title = 'Blueprints';

    getMenuItems = () => {
        return [
            <MenuItem key={'armorBlueprint'}
                      onClick={this.createOnClick(this.showCrudAction(this.props.onCrud, store.armorBlueprintService))}>
                Zbroja</MenuItem>,
            <MenuItem key={'meleeWeaponBlueprint'}
                      onClick={this.createOnClick(this.showCrudAction(this.props.onCrud, store.meleeWeaponBlueprintService))}>
                Broń ręczna</MenuItem>,
            <MenuItem key={'rangedWeaponBlueprint'}
                      onClick={this.createOnClick(this.showCrudAction(this.props.onCrud, store.rangedWeaponBlueprintService))}>
                Broń dystansowa</MenuItem>
        ];
    };
}