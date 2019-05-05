import React from "react";
import {MenuItem} from "@material-ui/core";
import MenuComponent from "../../menu/MenuComponent";

class CrudWorldMenu extends MenuComponent {
    title = 'World';

    getMenuItems = () => {
        const {
            nationService, onNation,
            languageService, onLanguage,
            raceService, onRace,
            currencyService, onCurrency} = this.props;

        return [
            <MenuItem key={'nation'} onClick={this.showCrudAction(onNation, nationService)}>Nation</MenuItem>,
            <MenuItem key={'language'} onClick={this.showCrudAction(onLanguage, languageService)}>Language</MenuItem>,
            <MenuItem key={'race'} onClick={this.showCrudAction(onRace, raceService)}>Race</MenuItem>,
            <MenuItem key={'currency'} onClick={this.showCrudAction(onCurrency, currencyService)}>Currency</MenuItem>,
        ];
    };
}

export default CrudWorldMenu;