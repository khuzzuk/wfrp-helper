import {FormFieldType}                                 from "../../form/FormFieldType";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import DeterminantContainer                            from "../rule/DeterminantContainer";

export default class AnimalKind extends DeterminantContainer {
    static entityName: string = 'animalKind';

    name: string;
    description: string;
};

RegisterEntity(AnimalKind,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('description', FormFieldType.TEXT_AREA),],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('description', FormFieldType.TEXT_AREA),
                CreateFormField('determinants', FormFieldType.DETERMINANT),]);
