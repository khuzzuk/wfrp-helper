import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";

export default class SpellSchool extends Entity {
    static entityName: string = 'spellSchool';

    name: string;
    description: string;
    levels: number = 0;

    updateWith(entity: *): SpellSchool {
        return super.updateWith(entity);
    }
}

RegisterEntity(SpellSchool, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('levels', FormFieldType.INTEGER),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('levels', FormFieldType.INTEGER),
]);