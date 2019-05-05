import Entity from "../../../../crud/Entity";
import ActionTime from "../../../rule/ActionTime";
import SpellSchool from "../spellSchool/SpellSchool";
import Item from "../../../crafting/item/Item";

export default class Spell extends Entity {
    name: string;
    description: string;
    effect: string;
    level: number;
    manaCost: number;
    range: number;
    prepareTime: ActionTime = new ActionTime();
    durationTime: ActionTime = new ActionTime();
    spellSchool: SpellSchool;
    ingredients: Item[];
}