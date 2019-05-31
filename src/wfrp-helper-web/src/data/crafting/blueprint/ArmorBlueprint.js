import Price from "../../world/money/Price";
import {Placement} from "../Placement";
import DeterminantContainer from "../../../crud/DeterminantContainer";

export default class ArmorBlueprint extends DeterminantContainer {
    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    placement: string = Placement.BODY;
}