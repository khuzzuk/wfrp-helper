import {FormFieldType} from "../../form/FormFieldType";
import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Nation from "./Nation";

export default class Place extends Entity {
  static entityName: string = 'place';

  name: string;
  description: string;
  nation: Nation;

  updateWith(entity: *): Place {
    super.updateWith(entity);
    this.updateEntityProp('nation', () => new Nation());
    return this;
  }
}

RegisterEntity(Place,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('description', FormFieldType.TEXT_AREA),
                CreateColumn('nation', FormFieldType.ENTITY_SELECT),],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('description', FormFieldType.TEXT_AREA),
                CreateFormField('nation', FormFieldType.ENTITY_SELECT, Nation.entityName),]);