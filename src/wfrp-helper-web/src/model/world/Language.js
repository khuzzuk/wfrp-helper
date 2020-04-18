import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Nation from "./Nation";
import {FormFieldType} from "../../form/FormFieldType";

export default class Language extends Entity {
    static entityName: string = 'worldLanguage';

    name: string;
    description: string;
    nations: Nation[];

    updateWith(entity: Language): Language {
        super.updateWith(entity);
        this.updateEntityList(entity, 'nations', () => new Nation());
        return this;
    }
}

RegisterEntity(Language, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('nations', FormFieldType.ENTITY_COMBOBOX, Nation.entityName),
]);