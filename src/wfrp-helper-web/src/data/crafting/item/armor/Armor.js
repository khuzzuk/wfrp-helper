import Price from "../../../world/money/Price";
import Resource from "../../resource/Resource";
import ArmorBlueprint from "../../blueprint/ArmorBlueprint";
import ArmorPattern from "./ArmorPattern";
import DeterminantContainer from "../../../../crud/DeterminantContainer";

export default class Armor extends DeterminantContainer {
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
        this.updateEntityProp(entity, 'price', () => new Price());
        this.updateEntityProp(entity, 'primaryResource', () => new Resource());
        this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
        this.updateEntityProp(entity, 'type', () => new ArmorBlueprint());
        this.updateEntityProp(entity, 'armorPattern', () => new ArmorPattern());
    }
}