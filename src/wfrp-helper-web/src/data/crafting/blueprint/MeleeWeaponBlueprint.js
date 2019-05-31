import Modifier from "../../rule/Modifier";
import ActionTime from "../../rule/ActionTime";
import Price from "../../world/money/Price";
import DeterminantContainer from "../../../crud/DeterminantContainer";

export default class MeleeWeaponBlueprint extends DeterminantContainer {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    damage: Modifier = new Modifier();
    prepareTime: ActionTime = new ActionTime();

    updateWith(entity: MeleeWeaponBlueprint) {
        super.updateWith(entity);

        if (entity.damage) {
            this.damage = new Modifier();
            this.damage.updateWith(entity.damage);
        }
    }
}