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

    getMenuItems = () => {
        return [
            <MenuItem key={'armorBlueprint'} onClick={this.showArmorBlueprintCrud}>Armor</MenuItem>
        ];
    };
}