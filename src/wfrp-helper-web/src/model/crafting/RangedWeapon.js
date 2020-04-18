import {FormFieldType}                                 from "../../form/FormFieldType";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import DeterminantContainer                            from "../rule/DeterminantContainer";
import Price                                           from "../world/Price";
import {availabilityEntityName}                        from "./Availability";
import RangedWeaponBlueprint                           from "./RangedWeaponBlueprint";
import Resource                                        from "./Resource";

export default class RangedWeapon extends DeterminantContainer {
    static entityName: string = 'rangedWeapon';

    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';
    primaryResource: Resource;
    secondaryResource: Resource;
    type: RangedWeaponBlueprint;

    updateWith(entity: RangedWeapon): RangedWeapon {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'price', () => new Price());
        this.updateEntityProp(entity, 'primaryResource', () => new Resource());
        this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
        this.updateEntityProp(entity, 'type', () => new RangedWeaponBlueprint());
        return this;
    }
}

RegisterEntity(RangedWeapon,
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
                                RangedWeaponBlueprint.entityName),
                CreateFormField('determinants', FormFieldType.DETERMINANT),]);
