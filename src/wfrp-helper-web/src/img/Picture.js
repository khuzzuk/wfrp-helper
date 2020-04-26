import {FormFieldType} from "../form/FormFieldType";
import Entity, {CreateColumn, RegisterEntity} from "../model/Entity";
import Place from "../model/world/Place";

export default class Picture extends Entity {
  static entityName = 'picture';

  name: string;
  place: Place;

  updateWith(entity: *): Picture {
    super.updateWith(entity);
    this.updateEntityProp('place', () => new Place());
    return this;
  }
}

RegisterEntity(Picture,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('place', FormFieldType.ENTITY_SELECT)],
               []);