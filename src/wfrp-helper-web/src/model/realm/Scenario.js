import {FormFieldType} from "../../form/FormFieldType";
import Person from "../creature/Person";
import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Place from "../world/Place";
import Realm from "./Realm";

export default class Scenario extends Entity {
  static entityName: string = 'scenario';

  name: string;
  realm: Realm;
  places: Place[]   = [];
  persons: Person[] = [];

  updateWith(entity: Scenario): Scenario {
    this.updateProp(entity, 'id');
    this.updateProp(entity, 'uuid');
    this.updateProp(entity, 'name');
    this.updateEntityProp(entity, 'realm', () => new Realm());
    this.updateEntityList(entity, 'places', () => new Place());
    this.updateEntityList(entity, 'persons', () => new Person());
    return this;
  }
}

RegisterEntity(Scenario,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('realm', FormFieldType.ENTITY_SELECT),],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('realm', FormFieldType.ENTITY_SELECT, Realm.entityName),
                CreateFormField('places', FormFieldType.ENTITY_COMBOBOX, Place.entityName),
                CreateFormField('persons', FormFieldType.ENTITY_COMBOBOX, Person.entityName),]);