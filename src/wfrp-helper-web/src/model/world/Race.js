import DeterminantContainer from "../rule/DeterminantContainer";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";

export default class Race extends DeterminantContainer {
    static entityName: string = 'race';

    name: string;
    specialFeature: string;
}

RegisterEntity(Race, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('specialFeature', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('specialFeatures', FormFieldType.TEXT_AREA),
    CreateFormField('determinants', FormFieldType.RACE_DETERMINANTS),
]);