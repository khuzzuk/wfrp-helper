import Entity from "../../../crud/Entity";
import Price from "../../world/money/Price";
import Determinant from "../../rule/Determinant";

export default class ArmorBlueprint extends Entity {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    determinants: Determinant[];
    placement: string;
}