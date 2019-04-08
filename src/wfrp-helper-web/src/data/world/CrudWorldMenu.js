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
            <MenuItem key={'nation'} onClick={this.showNationCrud}>Nation</MenuItem>,
            <MenuItem key={'language'} onClick={this.showLanguagesCrud}>Language</MenuItem>
        ];
    };
}

export default CrudWorldMenu;