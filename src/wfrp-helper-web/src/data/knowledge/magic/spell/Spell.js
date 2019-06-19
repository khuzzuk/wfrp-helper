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


    updateWith(entity: *) {
        super.updateWith(entity);

        if (entity.prepareTime) {
            this.prepareTime = new ActionTime();
            this.prepareTime.updateWith(entity.prepareTime);
        }
        if (entity.durationTime) {
            this.durationTime = new ActionTime();
            this.durationTime.updateWith(entity.durationTime);
        }

        if (entity.ingredients) {
            this.ingredients = entity.ingredients.map(item => {
                const newItem = new Item();
                newItem.updateWith(item);
                return newItem;
            });
        }
    }
}