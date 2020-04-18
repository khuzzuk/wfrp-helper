import DeterminantContainer from "../rule/DeterminantContainer";
import Price from "../world/Price";
import {Placement, placementJewelryName} from "./Placement";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";
import {availabilityEntityName} from "./Availability";
import Resource from "./Resource";

export default class Jewelry extends DeterminantContainer {
    static entityName: string = 'jewelry';

    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';
    primaryResource: Resource;
    secondaryResource: Resource;
    placement: string = Placement.NECK;

    updateWith(entity: *): Jewelry {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'price', () => new Price());
        this.updateEntityProp(entity, 'primaryResource', () => new Resource());
        this.updateEntityProp(entity, 'secondaryResource', () => new Resource());
        return this;
    }
}

RegisterEntity(Jewelry, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('price', FormFieldType.PRICE),
    CreateColumn('availability', FormFieldType.TEXT),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('weight', FormFieldType.FLOAT),
    CreateFormField('price', FormFieldType.PRICE),
    CreateFormField('availability', FormFieldType.ENUM_SELECT, availabilityEntityName),
    CreateFormField('primaryResource', FormFieldType.ENTITY_SELECT, Resource.entityName),
    CreateFormField('secondaryResource', FormFieldType.ENTITY_SELECT, Resource.entityName),
    CreateFormField('placement', FormFieldType.ENUM_SELECT, placementJewelryName),
]);