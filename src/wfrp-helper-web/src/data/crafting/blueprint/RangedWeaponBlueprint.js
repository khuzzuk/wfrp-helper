import Entity from "../../../crud/Entity";
import Price from "../../world/money/Price";
import Determinant from "../../rule/Determinant";
import Modifier from "../../rule/Modifier";
import ActionTime from "../../rule/ActionTime";

export default class RangedWeaponBlueprint extends Entity {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    determinants: Determinant[];
    damage: Modifier = new Modifier();
    prepareTime: ActionTime = new ActionTime();
    minimumRange: number = 0;
    mediumRange: number = 0;
    maximumRange: number = 0;

    updateWith(entity: RangedWeaponBlueprint) {
        super.updateWith(entity);
        this.determinants = entity.determinants
            ? entity.determinants
                .map(value => {
                    const det = new Determinant();
                    det.updateWith(value);
                    return det;
                }) : this.determinants;

        if (entity.damage) {
            this.damage = new Modifier();
            this.damage.updateWith(entity.damage);
        }
    }
}