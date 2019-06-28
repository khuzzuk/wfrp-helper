// @flow
import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import SelectableList from "../crud/field/SelectableList";
import AnimalElement from "./AnimalElement";
import {Collections} from "../util/Collections";
import EntityComponent from "../crud/EntityComponent";

const componentStyle = {
    container: {
        minWidth: 810,
        maxWidth: 810,
        minHeight: 150,
        maxHeight: 150,
        paddingLeft: 40,
        paddingTop: 20,
    },
    animalList: {
        minWidth: 720,
        maxWidth: 720,
        minHeight: 280,
        maxHeight: 280,
    },
};

class AnimalsSection extends EntityComponent {
    render() {
        const {
            customStyle, classes,
            entity, personService,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container}>
                <SelectableList customStyle={{container: currentStyle.spellList}}
                                data={Collections.except(personService.animals, entity.animals)}
                                onGearAdd={this.pushToEntity('animals')}>
                    {entity.animals.map(animal => <AnimalElement animal={animal} onRemove={this.removeFromArray('animals')}/>)}
                </SelectableList>
            </div>
        );
    };
};

export default withStyles(componentStyle)(AnimalsSection);