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
        const {raceService, onRace} = this.props;

        return [
            <MenuItem key={'nation'} onClick={this.showNationCrud}>Nation</MenuItem>,
            <MenuItem key={'language'} onClick={this.showLanguagesCrud}>Language</MenuItem>,
            <MenuItem key={'race'} onClick={this.showCrudAction(onRace, raceService)}>Race</MenuItem>
        ];
    };
}

export default CrudWorldMenu;