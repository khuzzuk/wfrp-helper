import {FormFieldType} from "../form/FormFieldType";
import Entity, {
  CreateColumn,
  CreateFormField
} from "../model/Entity";
import Role from "./Role";
import {State} from "../state/State";

export default class User extends Entity {
  static entityName: string = 'user';

  name: string;
  username: string;
  password: string;
  authorities: Role[];

  updateWith(entity: User): User {
    super.updateWith(entity);
    this.updateEntityList(entity, 'authorities', () => new Role());
    this.name = entity.username;
    return this;
  }
}

State.suppliers.user = () => new User();
State.columns.user    = [CreateColumn('username', FormFieldType.TEXT)];
State.formFields.user = [CreateFormField('authorities', FormFieldType.ENTITY_COMBOBOX, Role.entityName)];