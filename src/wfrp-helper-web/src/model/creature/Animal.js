import {FormFieldType}                                 from "../../form/FormFieldType";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import DeterminantContainer                            from "../rule/DeterminantContainer";
import AnimalKind                                      from "./AnimalKind";

export default class Animal extends DeterminantContainer {
  static entityName: string = 'animal';

  name: string;
  description: string;
  animalKind: AnimalKind;

  updateWith(entity: Animal): Animal {
    super.updateWith(entity);
    this.updateEntityProp(entity, 'animalKind', () => new AnimalKind());
    return this;
  }
}

RegisterEntity(Animal,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('description', FormFieldType.TEXT_AREA),
                CreateColumn('animalKind', FormFieldType.ENTITY_SELECT)],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('description', FormFieldType.TEXT_AREA),
                CreateFormField('animalKind', FormFieldType.ENTITY_SELECT, AnimalKind.entityName),
                CreateFormField('determinants', FormFieldType.DETERMINANT),]);
