import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import ActionTime from "../rule/ActionTime";
import SpellSchool from "./SpellSchool";
import Item from "../crafting/Item";
import {FormFieldType} from "../../form/FormFieldType";

export default class Spell extends Entity {
    static entityName: string = 'spell';

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


    updateWith(entity: Spell): Spell {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'prepareTime', () => new ActionTime());
        this.updateEntityProp(entity, 'durationTime', () => new ActionTime());
        this.updateEntityProp(entity, 'spellSchool', () => new SpellSchool());
        this.updateEntityList(entity, 'ingredients', () => new Item());
        return this;
    }
}

RegisterEntity(Spell, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('level', FormFieldType.INTEGER),
    CreateColumn('manaCost', FormFieldType.INTEGER),
    CreateColumn('range', FormFieldType.INTEGER),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('effect', FormFieldType.TEXT_AREA),
    CreateFormField('level', FormFieldType.INTEGER),
    CreateFormField('manaCost', FormFieldType.INTEGER),
    CreateFormField('range', FormFieldType.INTEGER),
    CreateFormField('prepareTime', FormFieldType.ACTION_TIME),
    CreateFormField('durationTime', FormFieldType.ACTION_TIME),
    CreateFormField('spellSchool', FormFieldType.ENTITY_SELECT, SpellSchool.entityName),
    CreateFormField('ingredients', FormFieldType.ENTITY_COMBOBOX, Item.entityName),
]);