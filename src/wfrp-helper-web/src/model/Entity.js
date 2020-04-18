import ModelElement from "./ModelElement";
import {FormFieldType} from "../form/FormFieldType";
import FormFieldData from "../form/FormFieldData";
import {State} from "../state/State";
import Service from "../client/Service";

class Entity extends ModelElement {
    id: number;
    version: number;
    uuid: string;
}

export default Entity;

export const CreateColumn = (name: string, type: string) => {
    const options = {filter: false, sort: false};
    const column = {name: name, options: options};

    switch (type) {
        case FormFieldType.TEXT:
        case FormFieldType.FLOAT:
        case FormFieldType.INTEGER:
        case FormFieldType.BOOLEAN:
            options.filter = true;
            options.sort = true;
            break;
        case FormFieldType.PRICE:
        case FormFieldType.MODIFIER:
        case FormFieldType.ACTION_TIME:
            options.filter = false;
            options.sort = true;
            options.customBodyRender = val => val ? val.toString() : '';
            break;
        case FormFieldType.ENTITY_SELECT:
        case FormFieldType.ENTITY_COMBOBOX:
            options.filter = true;
            options.sort = true;
            options.customBodyRender = val => val ? val.name : '';
            break;
        default:
            options.filter = false;
            options.sort = false;
    }

    return column;
};

export const CreateFormField = (name: string, type: string, suggestions: string, toView: string => string, toModel: string => string) => {
    const formField = new FormFieldData();
    formField.name = name;
    formField.type = type;
    formField.suggestions = suggestions;
    formField.toView = toView;
    formField.toModel = toModel;
    return formField;
};

export const RegisterEntity = (entityClass: any, columns: FormFieldData[], fields: FormFieldData[]) => {
    State.suppliers[entityClass.entityName] = () => new entityClass();
    State.services[entityClass.entityName] = new Service(entityClass.entityName);
    State.columns[entityClass.entityName] = columns;
    State.formFields[entityClass.entityName] = fields;
};
