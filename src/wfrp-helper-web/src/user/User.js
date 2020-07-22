import {FormFieldType} from "../form/FormFieldType";
import Entity, {CreateColumn, CreateFormField} from "../model/Entity";
import {State} from "../state/State";
import Role from "./Role";

export default class User extends Entity {
  static entityName: string = 'user';

  username: string;
  password: string;
  authorities: Role[];
}

State.suppliers.user = () => new User();
State.columns.user    = [CreateColumn('username', FormFieldType.TEXT)];
State.formFields.user = [CreateFormField('authorities', FormFieldType.ENTITY_COMBOBOX, Role.entityName)];