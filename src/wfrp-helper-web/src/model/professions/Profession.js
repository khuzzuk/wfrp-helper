import ProfessionClass from "./ProfessionClass";
import DeterminantContainer from "../rule/DeterminantContainer";
import Skill from "../knowledge/Skill";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";

export default class Profession extends DeterminantContainer {
    static entityName: string = 'profession';

    name: string;
    description: string;
    professionClass: ProfessionClass;
    skills: Skill[] = [];
    nextProfessions: Profession[] = [];

    updateWith(entity: Profession): Profession {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'professionClass', () => new ProfessionClass());
        this.updateEntityList(entity, 'skills', () => new Skill());
        return this;
    }
}

RegisterEntity(Profession, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('professionClass', FormFieldType.ENTITY_SELECT, ProfessionClass.entityName),
    CreateFormField('determinants', FormFieldType.DETERMINANT),
    CreateFormField('skills', FormFieldType.ENTITY_COMBOBOX, Skill.entityName),
    CreateFormField('nextProfessions', FormFieldType.ENUM_COMBOBOX, Profession.entityName),
]);