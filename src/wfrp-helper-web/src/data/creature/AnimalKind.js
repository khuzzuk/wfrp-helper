import Entity from "../../crud/Entity";
import Determinant from "../rule/Determinant";

export default class AnimalKind extends Entity {
    name: string;
    description: string;
    determinants: Determinant[] = [];


    updateWith(entity: AnimalKind) {
        super.updateWith(entity);

        if (entity.determinants) {
            this.determinants = entity.determinants
                .map(value => {
                    const det = new Determinant();
                    det.updateWith(value);
                    return det;
                })
        }
    }
};