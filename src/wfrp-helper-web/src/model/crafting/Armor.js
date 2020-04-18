import ArmorPattern                                    from "./ArmorPattern";
import DeterminantContainer
                                                       from "../rule/DeterminantContainer";
import Price                                           from "../world/Price";
import Resource                                        from "./Resource";
import ArmorBlueprint                                  from "./ArmorBlueprint";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType}                                 from "../../form/FormFieldType";
import {availabilityEntityName}                        from "./Availability";

export default class Armor extends DeterminantContainer {
  static entityName: string = 'armor';

  name: string;
  description: string;
  weight: number;
  price: Price = new Price();
  availability: string = 'COMMON';
  primaryResource: Resource;
  secondaryResource: Resource;
  type: ArmorBlueprint;
  armorPattern: ArmorPattern;

  updateWith(entity: *): Armor {
    super.updateWith(entity);
    this.updateEntityProp(entity, 'price', () => new Price());
    this.updateEntityProp(entity, 'primaryResource', () => new Resource());
    this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
    this.updateEntityProp(entity, 'type', () => new ArmorBlueprint());
    this.updateEntityProp(entity, 'armorPattern', () => new ArmorPattern());
    return this;
  }
}

RegisterEntity(Armor,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('description', FormFieldType.TEXT_AREA),
                CreateColumn('price', FormFieldType.PRICE),
                CreateColumn('type', FormFieldType.ENTITY_SELECT),
                CreateColumn('armorPattern', FormFieldType.ENTITY_SELECT),
               ],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('description', FormFieldType.TEXT_AREA),
                CreateFormField('weight', FormFieldType.FLOAT),
                CreateFormField('price', FormFieldType.PRICE),
                CreateFormField('availability', FormFieldType.ENUM_SELECT, availabilityEntityName),
                CreateFormField('primaryResource', FormFieldType.ENTITY_SELECT, Resource.entityName),
                CreateFormField('secondaryResource', FormFieldType.ENTITY_SELECT, Resource.entityName),
                CreateFormField('type', FormFieldType.BLUEPRINT_SELECT, ArmorBlueprint.entityName),
                CreateFormField('armorPattern', FormFieldType.ENTITY_SELECT, ArmorPattern.entityName),
                CreateFormField('determinants', FormFieldType.DETERMINANT),]);
