import {ModifierType} from "./ModifierType";
import {DiceRoll} from "./DiceRoll";
import {BaseEntity} from "../BaseEntity";

export class Modifier extends BaseEntity {
    value: number = 0;
    type: ModifierType = ModifierType.REGULAR;
    rolls: DiceRoll[] = [];
}