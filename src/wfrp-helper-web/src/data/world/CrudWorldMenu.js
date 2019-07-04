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
            currencyService, onCurrency,
            religionService, onReligion,
            realmService, onRealm
        } = this.props;

        return [
            <MenuItem key={'nation'} onClick={this.showCrudAction(onNation, nationService)}>Kraje</MenuItem>,
            <MenuItem key={'language'} onClick={this.showCrudAction(onLanguage, languageService)}>Języki</MenuItem>,
            <MenuItem key={'race'} onClick={this.showCrudAction(onRace, raceService)}>Rasy</MenuItem>,
            <MenuItem key={'currency'} onClick={this.showCrudAction(onCurrency, currencyService)}>Waluty</MenuItem>,
            <MenuItem key={'religion'} onClick={this.showCrudAction(onReligion, religionService)}>Religie</MenuItem>,
            <MenuItem key={'realm'} onClick={this.showCrudAction(onRealm, realmService)}>Światy</MenuItem>,
        ];
    };
}

export default CrudWorldMenu;