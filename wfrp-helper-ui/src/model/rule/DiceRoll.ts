import {BaseEntity} from "../BaseEntity";
import {Dice} from "./Dice";

export class DiceRoll extends BaseEntity {
    dice: Dice = Dice.K6;
    rolls: number = 1;
}