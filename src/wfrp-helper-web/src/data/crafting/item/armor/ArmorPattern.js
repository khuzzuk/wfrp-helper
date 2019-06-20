import Entity from "../../../../crud/Entity";
import Availability from "../../../rule/Availability";

export default class ArmorPattern extends Entity {
    name: string;
    description: string;
    priceMultiplier: number;
    weight: number;
    strength: number;
    availability: string = Availability[0];
}