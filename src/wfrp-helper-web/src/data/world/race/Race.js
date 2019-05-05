import Entity from "../../../crud/Entity";
import Determinant from "../../rule/Determinant";

export default class Race extends Entity {
    name: string;
    specialFeature: string;
    determinants: Determinant[];

    updateWith(entity: Race) {
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