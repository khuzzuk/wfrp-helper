import {FormFieldType} from "../form/FormFieldType";
import Entity, {CreateColumn, RegisterEntity} from "../model/Entity";

export default class Picture extends Entity {
  static entityName = 'picture';

  name: string;
}

RegisterEntity(Picture, [CreateColumn('name', FormFieldType.TEXT)], []);