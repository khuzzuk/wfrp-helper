import React from "react";
import {MenuItem} from "@material-ui/core";
import MenuComponent from "../../menu/MenuComponent";

export default class CrudWorldMenu extends MenuComponent {
    title = 'World';

    getMenuItems = () => {
        const {onCrud, store} = this.props;

        return [
            <MenuItem key={'nation'} onClick={this.showCrudAction(onCrud, store.nationService)}>Kraje</MenuItem>,
            <MenuItem key={'language'} onClick={this.showCrudAction(onCrud, store.languageService)}>Języki</MenuItem>,
            <MenuItem key={'race'} onClick={this.showCrudAction(onCrud, store.raceService)}>Rasy</MenuItem>,
            <MenuItem key={'currency'} onClick={this.showCrudAction(onCrud, store.currencyService)}>Waluty</MenuItem>,
            <MenuItem key={'religion'} onClick={this.showCrudAction(onCrud, store.religionService)}>Religie</MenuItem>,
            <MenuItem key={'realm'} onClick={this.showCrudAction(onCrud, store.realmService)}>Światy</MenuItem>,
        ];
    };
}
