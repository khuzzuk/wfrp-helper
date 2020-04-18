import {FormFieldType} from "../../form/FormFieldType";
import Person from "../creature/Person";
import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Nation from "../world/Nation";

export default class Realm extends Entity {
  static entityName: string = 'realm';

  name: string;
  nations: Nation[] = [];
  persons: Person[] = [];

  updateWith(entity: Realm): Realm {
    super.updateWith(entity);
    this.updateEntityList(entity, 'nations', () => new Nation());
    this.updateEntityList(entity, 'persons', () => new Person());
    return this;
  }
}

RegisterEntity(Realm,
               [CreateColumn('name', FormFieldType.TEXT),],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('nations', FormFieldType.ENTITY_COMBOBOX, Nation.entityName),
                CreateFormField('persons', FormFieldType.ENTITY_COMBOBOX, Person.entityName),]);