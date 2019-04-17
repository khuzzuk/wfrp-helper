import Entity from "../../../crud/Entity";
import Modifier from "../../rule/Modifier";
import ActionTime from "../../rule/ActionTime";
import Price from "../../world/money/Price";
import Determinant from "../../rule/Determinant";

export default class MeleeWeaponBlueprint extends Entity {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    determinants: Determinant[];
    damage: Modifier = new Modifier();
    prepareTime: ActionTime = new ActionTime();

    updateWith(entity: MeleeWeaponBlueprint) {
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