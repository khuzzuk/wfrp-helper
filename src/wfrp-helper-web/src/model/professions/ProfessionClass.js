import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Skill from "../knowledge/Skill";
import {FormFieldType} from "../../form/FormFieldType";

export default class ProfessionClass extends Entity {
    static entityName: string = 'professionClass';

    name: string;
    description: string;
    skills: Skill[] = [];

    updateWith(entity: ProfessionClass): ProfessionClass {
        super.updateWith(entity);
        this.updateEntityList(entity, 'skills', () => new Skill());
        return this;
    }
}

RegisterEntity(ProfessionClass, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('skills', FormFieldType.ENTITY_COMBOBOX, Skill.entityName)
]);