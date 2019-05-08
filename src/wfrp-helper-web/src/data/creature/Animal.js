import AnimalKind from "./AnimalKind";
import DeterminantConteiner from "../../crud/DeterminantConteiner";

export default class Animal extends DeterminantConteiner {
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