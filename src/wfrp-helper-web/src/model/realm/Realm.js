import {FormFieldType} from "../../form/FormFieldType";
import Person from "../creature/Person";
import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import SpellSchool from "../knowledge/SpellSchool";
import Nation from "../world/Nation";
import Race from "../world/Race";

export default class Realm extends Entity {
  static entityName: string = 'realm';

  name: string;
  nations: Nation[]           = [];
  races: Race[]               = [];
  spellSchools: SpellSchool[] = [];
  persons: Person[]           = [];

  updateWith(entity: Realm): Realm {
    super.updateWith(entity);
    this.updateEntityList(entity, 'nations', () => new Nation());
    this.updateEntityList(entity, 'races', () => new Race());
    this.updateEntityList(entity, 'spellSchools', () => new SpellSchool());
    this.updateEntityList(entity, 'persons', () => new Person());
    return this;
  }
}

RegisterEntity(Realm,
               [CreateColumn('name', FormFieldType.TEXT),],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('nations', FormFieldType.ENTITY_COMBOBOX, Nation.entityName),
                CreateFormField('races', FormFieldType.ENTITY_COMBOBOX, Race.entityName),
                CreateFormField('spellSchools',
                                FormFieldType.ENTITY_COMBOBOX,
                                SpellSchool.entityName),
                CreateFormField('persons', FormFieldType.ENTITY_COMBOBOX, Person.entityName),]);