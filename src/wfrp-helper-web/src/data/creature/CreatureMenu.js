import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import {store} from "../../state";

export default class CreatureMenu extends MenuComponent {
    title = 'Creatures';

    getMenuItems = () => {
        const {onCrud, onPerson} = this.props;
        return [
            <MenuItem key={'person'} onClick={this.showCrudAction(onPerson, store.personService)}>BN</MenuItem>,
            <MenuItem key={'animal'} onClick={this.showCrudAction(onCrud, store.animalService)}>Animal</MenuItem>,
            <MenuItem key={'animalKind'} onClick={this.showCrudAction(onCrud, store.animalKindService)}>Animal Kind</MenuItem>,
        ];
    }
}