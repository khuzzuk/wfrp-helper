import {Item} from "./Item";
import {DescribedEntity} from "../DescribedEntity";
import DeterminantEntity from "../rule/DeterminantEntity";
import {Determinant} from "../rule/Determinant";
import {Placement} from "./Placement";

export class Armor extends Item {
    type?: ArmorBlueprint;
}

export class ArmorBlueprint extends DescribedEntity implements DeterminantEntity {
    determinants: Determinant[] = [];
    placement: Placement[] = [];
    armor: number = 0;
}