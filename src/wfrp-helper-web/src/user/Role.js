import Entity from "../model/Entity";
import {State} from "../state/State";

export default class Role extends Entity {
  static entityName: string = 'role';

  authority: string;
}

State.suppliers.role = () => new Role();
