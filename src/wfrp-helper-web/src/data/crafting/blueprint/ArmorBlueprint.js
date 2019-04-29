import Entity from "../../../crud/Entity";
import Price from "../../world/money/Price";
import Determinant from "../../rule/Determinant";
import {Placement} from "../Placement";

export default class ArmorBlueprint extends Entity {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    determinants: Determinant[];
    placement: string = Placement.BODY;

    updateWith(entity: *) {
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