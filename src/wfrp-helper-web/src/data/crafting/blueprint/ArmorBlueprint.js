import Price from "../../world/money/Price";
import {Placement} from "../Placement";
import DeterminantConteiner from "../../../crud/DeterminantConteiner";

export default class ArmorBlueprint extends DeterminantConteiner {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    placement: string = Placement.BODY;
}