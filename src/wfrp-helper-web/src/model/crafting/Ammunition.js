import {FormFieldType}                                 from "../../form/FormFieldType";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import DeterminantContainer                            from "../rule/DeterminantContainer";
import Price                                           from "../world/Price";
import ArmorBlueprint                                  from "./ArmorBlueprint";
import ArmorPattern                                    from "./ArmorPattern";
import {availabilityEntityName}                        from "./Availability";
import RangedWeaponBlueprint                           from "./RangedWeaponBlueprint";
import Resource                                        from "./Resource";

export default class Ammunition extends DeterminantContainer {
    static entityName: string = 'ammunition';

    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';
    primaryResource: Resource;
    secondaryResource: Resource;
    weaponTypes: RangedWeaponBlueprint[] = [];

    updateWith(entity: Ammunition): Ammunition {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'price', () => new Price());
        this.updateEntityProp(entity, 'primaryResource', () => new Resource());
        this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
        this.updateEntityList(entity, 'weaponTypes', () => new RangedWeaponBlueprint());
        return this;
    }
}

RegisterEntity(Ammunition,
               [CreateColumn('name', FormFieldType.TEXT),
                CreateColumn('description', FormFieldType.TEXT_AREA),
                CreateColumn('price', FormFieldType.PRICE),
                CreateColumn('type', FormFieldType.ENTITY_SELECT),
                CreateColumn('availability', FormFieldType.TEXT),
               ],
               [CreateFormField('name', FormFieldType.TEXT),
                CreateFormField('description', FormFieldType.TEXT_AREA),
                CreateFormField('weight', FormFieldType.FLOAT),
                CreateFormField('price', FormFieldType.PRICE),
                CreateFormField('availability', FormFieldType.ENUM_SELECT, availabilityEntityName),
                CreateFormField('primaryResource', FormFieldType.ENTITY_SELECT, Resource.entityName),
                CreateFormField('secondaryResource', FormFieldType.ENTITY_SELECT, Resource.entityName),
                CreateFormField('weaponTypes', FormFieldType.ENTITY_COMBOBOX, RangedWeaponBlueprint.entityName),
                CreateFormField('determinants', FormFieldType.DETERMINANT),]);
