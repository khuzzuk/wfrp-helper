import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

export default class CreatureMenu extends MenuComponent {
    title = 'Creatures';

    getMenuItems = () => {
        const {
            personService, onPerson,
            animalService, onAnimal,
            animalKindService, onAnimalKind} = this.props;
        return [
            <MenuItem key={'person'} onClick={this.showCrudAction(onPerson, personService)}>BN</MenuItem>,
            <MenuItem key={'animal'} onClick={this.showCrudAction(onAnimal, animalService)}>Animal</MenuItem>,
            <MenuItem key={'animalKind'} onClick={this.showCrudAction(onAnimalKind, animalKindService)}>Animal Kind</MenuItem>,
        ];
    }
}