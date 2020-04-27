import DeterminantService from "../../client/DeterminantService";
import {FormFieldType}                                 from "../../form/FormFieldType";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import DeterminantContainer                            from "../rule/DeterminantContainer";
import Price                                           from "../world/Price";
import {availabilityEntityName}                        from "./Availability";
import MeleeWeaponBlueprint                            from "./MeleeWeaponBlueprint";
import Resource                                        from "./Resource";

export default class MeleeWeapon extends DeterminantContainer {
  static entityName: string = 'meleeWeapon';

  name: string;
  description: string;
  weight: number;
  price: Price = new Price();
  availability: string = 'COMMON';
  primaryResource: Resource;
  secondaryResource: Resource;
  type: MeleeWeaponBlueprint;

  updateWith(entity: *): MeleeWeapon {
    super.updateWith(entity);
    this.updateEntityProp(entity, 'price', () => new Price());
    this.updateEntityProp(entity, 'primaryResource', () => new Resource());
    this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
    this.updateEntityProp(entity, 'type', () => new MeleeWeaponBlueprint());
    return this;
  }

  getFinalValueForType(determinantType: string): number {
    return DeterminantService.sumValueByTypeIn(this.type.determinants, determinantType)
           + DeterminantService.sumValueByTypeIn(this.determinants, determinantType);
  }
}

RegisterEntity(MeleeWeapon,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('description', FormFieldType.TEXT_AREA),
                CreateColumn('price', FormFieldType.PRICE),
                CreateColumn('type', FormFieldType.ENTITY_SELECT),],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('description', FormFieldType.TEXT_AREA),
                CreateFormField('weight', FormFieldType.FLOAT),
                CreateFormField('price', FormFieldType.PRICE),
                CreateFormField('availability', FormFieldType.ENUM_SELECT, availabilityEntityName),
                CreateFormField('primaryResource',
                                FormFieldType.ENTITY_SELECT,
                                Resource.entityName),
                CreateFormField('secondaryResource',
                                FormFieldType.ENTITY_SELECT,
                                Resource.entityName),
                CreateFormField('type',
                                FormFieldType.BLUEPRINT_SELECT,
                                MeleeWeaponBlueprint.entityName),
                CreateFormField('determinants', FormFieldType.DETERMINANT),]);
