import Price from "../../world/money/Price";
import Modifier from "../../rule/Modifier";
import ActionTime from "../../rule/ActionTime";
import DeterminantConteiner from "../../../crud/DeterminantConteiner";

export default class RangedWeaponBlueprint extends DeterminantConteiner {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    damage: Modifier = new Modifier();
    prepareTime: ActionTime = new ActionTime();
    minimumRange: number = 0;
    mediumRange: number = 0;
    maximumRange: number = 0;

    updateWith(entity: RangedWeaponBlueprint) {
        super.updateWith(entity);

        if (entity.damage) {
            this.damage = new Modifier();
            this.damage.updateWith(entity.damage);
        }
    }
}