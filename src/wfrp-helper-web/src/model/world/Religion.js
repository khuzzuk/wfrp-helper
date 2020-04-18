import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Nation from "./Nation";
import {FormFieldType} from "../../form/FormFieldType";

export default class Religion extends Entity {
    static entityName: string = 'religion';

    name: string;
    nations: Nation[] = [];

    updateWith(entity: Religion): Religion {
        super.updateWith(entity);
        this.updateEntityList(entity, 'nations', () => new Nation());
        return this;
    }
}

RegisterEntity(Religion, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('nations', FormFieldType.ENTITY_COMBOBOX, Nation.entityName),
]);