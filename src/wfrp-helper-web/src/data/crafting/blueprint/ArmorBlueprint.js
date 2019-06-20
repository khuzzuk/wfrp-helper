import Price from "../../world/money/Price";
import DeterminantContainer from "../../../crud/DeterminantContainer";

export default class ArmorBlueprint extends DeterminantContainer {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    placement: string[] = [];

    updateWith(entity: DeterminantContainer) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'suggestedPrice', () => new Price());
    }
}