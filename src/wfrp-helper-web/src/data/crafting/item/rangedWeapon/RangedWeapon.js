import Entity from "../../../../crud/Entity";
import Price from "../../../world/money/Price";
import Determinant from "../../../rule/Determinant";
import Resource from "../../resource/Resource";
import MeleeWeaponBlueprint from "../../blueprint/MeleeWeaponBlueprint";
import RangedWeaponBlueprint from "../../blueprint/RangedWeaponBlueprint";

export default class RangedWeapon extends Entity {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    accessibility: string = 'COMMON';
    determinants: Determinant[];
    primaryResource: Resource;
    secondaryResource: Resource;
    type: RangedWeaponBlueprint;

    updateWith(entity: RangedWeapon) {
        super.updateWith(entity);

        if (entity.determinants) {
            this.determinants = entity.determinants
                .map(value => {
                    const det = new Determinant();
                    det.updateWith(value);
                    return det;
                })
        }

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