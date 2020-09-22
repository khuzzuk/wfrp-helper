import DeterminantContainer from "../rule/DeterminantContainer";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";
import Nation from "./Nation";

export default class Race extends DeterminantContainer {
    static entityName: string = 'race';

    name: string;
    specialFeature: string;
    nations: Nation;

    updateWith(entity: DeterminantContainer): DeterminantContainer {
        super.updateWith(entity)
        this.updateEntityList(entity, 'nations', () => new Nation());
        return this;
    }
}

RegisterEntity(Race, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('specialFeature', FormFieldType.TEXT_AREA),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('specialFeatures', FormFieldType.TEXT_AREA),
    CreateFormField('nations', FormFieldType.ENTITY_COMBOBOX, Nation.entityName),
    CreateFormField('determinants', FormFieldType.RACE_DETERMINANTS),
]);