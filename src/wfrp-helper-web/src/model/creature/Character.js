import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";

export default class Character extends Entity {
    static entityName: string = 'character';

    name: string;
    description: string;
}

RegisterEntity(Character, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
]);
