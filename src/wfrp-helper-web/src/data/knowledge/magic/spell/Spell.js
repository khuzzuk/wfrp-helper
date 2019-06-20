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
    ingredients: Item[] = [];


    updateWith(entity: Spell) {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'prepareTime', () => new ActionTime());
        this.updateEntityProp(entity, 'durationTime', () => new ActionTime());
        this.updateEntityProp(entity, 'spellSchool', () => new SpellSchool());
        this.updateEntityList(entity, 'ingredients', () => new Item());
    }
}