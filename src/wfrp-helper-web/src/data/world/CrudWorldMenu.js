import React from "react";
import {MenuItem} from "@material-ui/core";
import MenuComponent from "../../menu/MenuComponent";

class CrudWorldMenu extends MenuComponent {
    title = 'World';

    showNationCrud = () => {
        this.handleClose();
        this.props.onNation();
        this.props.nationService.retrieveData();
    };

    showLanguagesCrud = () => {
        this.handleClose();
        this.props.onLanguage();
        this.props.languageService.retrieveData();
    };

    getMenuItems = () => {
        return [
            <MenuItem onClick={this.showNationCrud}>Nations</MenuItem>,
            <MenuItem onClick={this.showLanguagesCrud}>Languages</MenuItem>
        ];
    };
}

export default CrudWorldMenu;