import Entity from "../../../../crud/Entity";

export default class ArmorPattern extends Entity {
    name: string;
    description: string;
    priceMultiplier: number;
    weight: number;
    strength: number;
    accessibility: string;
}