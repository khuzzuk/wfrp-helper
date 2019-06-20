import Price from "../../../world/money/Price";
import Resource from "../../resource/Resource";
import MeleeWeaponBlueprint from "../../blueprint/MeleeWeaponBlueprint";
import DeterminantContainer from "../../../../crud/DeterminantContainer";
import DeterminantService from "../../../rule/DeterminantService";

export default class MeleeWeapon extends DeterminantContainer {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';
    primaryResource: Resource;
    secondaryResource: Resource;
    type: MeleeWeaponBlueprint;

    updateWith(entity: *) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'price', () => new Price());
        this.updateEntityProp(entity, 'primaryResource', () => new Resource());
        this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
        this.updateEntityProp(entity, 'type', () => new MeleeWeaponBlueprint());
    }

    getFinalValueForType(determinantType: string): number {
        return DeterminantService.sumValueByTypeIn(this.type.determinants, determinantType) +
            DeterminantService.sumValueByTypeIn(this.determinants, determinantType);
    }
}