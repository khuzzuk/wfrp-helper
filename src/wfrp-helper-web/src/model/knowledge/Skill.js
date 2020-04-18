import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";

export default class Skill extends Entity {
    static entityName: string = 'skill';

    name: string;
    description: string;


    updateWith(entity: Skill): Skill {
        return super.updateWith(entity);
    }
}

RegisterEntity(Skill, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
]);