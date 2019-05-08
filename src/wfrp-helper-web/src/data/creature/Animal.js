import Entity from "../../crud/Entity";
import Determinant from "../rule/Determinant";
import AnimalKind from "./AnimalKind";

export default class Animal extends Entity {
    name: string;
    description: string;
    animalKind: AnimalKind;
    determinants: Determinant[] = [];


    updateWith(entity: Animal) {
        super.updateWith(entity);

        if (entity.animalKind) {
            this.animalKind = new AnimalKind();
            this.animalKind.updateWith(entity.animalKind);
        }

        if (entity.determinants) {
            this.determinants = entity.determinants
                .map(value => {
                    const det = new Determinant();
                    det.updateWith(value);
                    return det;
                })
        }
    }
}