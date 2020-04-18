import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";

export default class EyeColor extends Entity {
    static entityName: string = 'eyeColor';

    name: string;
    description: string;
}

RegisterEntity(EyeColor, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
]);
