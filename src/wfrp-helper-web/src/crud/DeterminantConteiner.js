import Entity from "./Entity";
import Determinant from "../data/rule/Determinant";

export default class DeterminantConteiner extends Entity {
    determinants: Determinant[] = [];


    updateWith(entity: DeterminantConteiner) {
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
}