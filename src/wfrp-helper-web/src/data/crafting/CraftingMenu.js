import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import React from "react";

class CraftingMenu extends MenuComponent {
    title = 'Crafting';

    showResourceCrud = () => {
        this.handleClose();
        this.props.onResource();
        this.props.resourceService.retrieveData();
    };

    getMenuItems = () => {
        return [
            <MenuItem onClick={this.showResourceCrud}>Resource</MenuItem>,
        ];
    };
}

export default CraftingMenu;