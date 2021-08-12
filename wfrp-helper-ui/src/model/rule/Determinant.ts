import {DeterminantType} from "./DeterminantType";
import {BaseEntity} from "../BaseEntity";
import {Modifier} from "./Modifier";

export class Determinant extends BaseEntity {
    type: DeterminantType = DeterminantType.BATTLE;
    value: number = 0;
    modifiers: Modifier[] = [];
}