// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import SelectableList from "../crud/field/SelectableList";
import AnimalElement from "./AnimalElement";

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

class AnimalsSection extends Component {
    addAnimal = animal => {
        this.props.entity.animals.push(animal);
        this.setState({addedAnimal: animal})
    };

    removeAnimal = animal => {
        const animals = this.props.entity.animals;
        animals.splice(animals.indexOf(animal), 1);
        this.setState({removedAnimal: animal});
    };

    getRelevantAnimals = () => {
        const currentAnimals = this.props.entity.animals;
        return this.props.personService.animals.filter(animal =>
        !currentAnimals.find(currentAnimal => currentAnimal.name === animal.name))
    };

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
                                data={this.getRelevantAnimals()}
                                onGearAdd={this.addAnimal}>
                    {entity.animals.map(animal => <AnimalElement animal={animal} onRemove={this.removeAnimal}/>)}
                </SelectableList>
            </div>
        );
    };
};

export default withStyles(componentStyle)(AnimalsSection);