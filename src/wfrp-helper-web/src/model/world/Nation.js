import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";

export default class Nation extends Entity {
    static entityName: string = 'nation';

    name: string;
    description: string;
    names: string[] = [];
}

const convertToNames = (namesAsString: string) => {
    return namesAsString.replace('\r', '').split('\n');
};
const convertToField = (namesFromModel: string[]) => {
    return namesFromModel.join("\n");
};

RegisterEntity(Nation, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA)
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('names', FormFieldType.TEXT_AREA, null, convertToField, convertToNames),
]);
