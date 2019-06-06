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

        if (entity.primaryResource) {
            this.primaryResource = new Resource();
            this.primaryResource.updateWith(entity.primaryResource);
        }
        if (entity.secondaryResource) {
            this.secondaryResource = new Resource();
            this.secondaryResource.updateWith(entity.secondaryResource);
        }
        if (entity.type) {
            this.type = new MeleeWeaponBlueprint();
            this.type.updateWith(entity.type);
        }
    }

    getFinalValueForType(determinantType: string): number {
        return DeterminantService.sumValueByTypeIn(this.type.determinants, determinantType) +
            DeterminantService.sumValueByTypeIn(this.determinants, determinantType);
    }
}