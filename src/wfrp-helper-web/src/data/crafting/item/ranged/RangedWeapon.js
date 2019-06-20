import Price from "../../../world/money/Price";
import Resource from "../../resource/Resource";
import RangedWeaponBlueprint from "../../blueprint/RangedWeaponBlueprint";
import DeterminantContainer from "../../../../crud/DeterminantContainer";

export default class RangedWeapon extends DeterminantContainer {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';
    primaryResource: Resource;
    secondaryResource: Resource;
    type: RangedWeaponBlueprint;

    updateWith(entity: RangedWeapon) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'price', () => new Price());
        this.updateEntityProp(entity, 'primaryResource', () => new Resource());
        this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
        this.updateEntityProp(entity, 'type', () => new RangedWeaponBlueprint());
    }
}