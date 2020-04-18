import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Nation from "./Nation";
import {FormFieldType} from "../../form/FormFieldType";

export default class Currency extends Entity {
    static entityName: string = 'currency';

    name: string;
    description: string;
    valueMultiplier: number;
    nations: Nation[];

    updateWith(entity: *): Currency {
        super.updateWith(entity);
        this.updateEntityList(entity, 'nations', () => new Nation());
        return this;
    }
}

RegisterEntity(Currency, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('valueMultiplier', FormFieldType.FLOAT)
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('valueMultiplier', FormFieldType.FLOAT),
    CreateFormField('nations', FormFieldType.ENTITY_COMBOBOX, Nation.entityName),
]);