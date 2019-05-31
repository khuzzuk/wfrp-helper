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

        if (entity.primaryResource) {
            this.primaryResource = new Resource();
            this.primaryResource.updateWith(entity.primaryResource);
        }
        if (entity.secondaryResource) {
            this.secondaryResource = new Resource();
            this.secondaryResource.updateWith(entity.secondaryResource);
        }
        if (entity.type) {
            this.type = new RangedWeaponBlueprint();
            this.type.updateWith(entity.type);
        }
    }
}