import DeterminantContainer                            from "../rule/DeterminantContainer";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType}                                 from "../../form/FormFieldType";

export default class PhysicalFeature extends DeterminantContainer {
    static entityName: string = 'physicalFeature';

    name: string;
    description: string;
}

RegisterEntity(PhysicalFeature,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('description', FormFieldType.TEXT_AREA),],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('description', FormFieldType.TEXT_AREA),
                CreateFormField('determinants', FormFieldType.DETERMINANT),]);
