import DeterminantContainer from "../../../../crud/DeterminantContainer";
import Price from "../../../world/money/Price";
import Resource from "../../resource/Resource";
import RangedWeaponBlueprint from "../../blueprint/RangedWeaponBlueprint";

export default class Ammunition extends DeterminantContainer {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';
    primaryResource: Resource;
    secondaryResource: Resource;
    type: RangedWeaponBlueprint[] = [];

    updateWith(entity: Ammunition) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'price', () => new Price());
        this.updateEntityProp(entity, 'primaryResource', () => new Resource());
        this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
        this.updateEntityProp(entity, 'type', () => new RangedWeaponBlueprint());
        this.updateEntityList(entity, 'weaponTypes', () => new RangedWeaponBlueprint());
    }
}