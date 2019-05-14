import Price from "../../../world/money/Price";
import Resource from "../../resource/Resource";
import ArmorBlueprint from "../../blueprint/ArmorBlueprint";
import ArmorPattern from "./ArmorPattern";
import DeterminantConteiner from "../../../../crud/DeterminantConteiner";

export default class Armor extends DeterminantConteiner {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    Availability: string = 'COMMON';
    primaryResource: Resource;
    secondaryResource: Resource;
    type: ArmorBlueprint;
    armorPattern: ArmorPattern;

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
            this.type = new ArmorBlueprint();
            this.type.updateWith(entity.type);
        }
        if (entity.armorPattern) {
            this.armorPattern = new ArmorPattern();
            this.armorPattern.updateWith(entity.armorPattern);
        }
    }
}