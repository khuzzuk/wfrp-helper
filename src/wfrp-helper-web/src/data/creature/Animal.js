import AnimalKind from "./AnimalKind";
import DeterminantContainer from "../../crud/DeterminantContainer";

export default class Animal extends DeterminantContainer {
    name: string;
    description: string;
    animalKind: AnimalKind;

    updateWith(entity: Animal) {
        super.updateWith(entity);

        if (entity.animalKind) {
            this.animalKind = new AnimalKind();
            this.animalKind.updateWith(entity.animalKind);
        }
    }
}