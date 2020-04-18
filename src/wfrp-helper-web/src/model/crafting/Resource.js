import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";
import {availabilityEntityName} from "./Availability";

export default class Resource extends Entity {
    static entityName: string = 'resource';

    name: string;
    description: string;
    priceMultiplier: number;
    weight: number;
    durability: number;
    strength: number;
    availability: string = 'COMMON';
}

RegisterEntity(Resource, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('priceMultiplier', FormFieldType.FLOAT),
    CreateColumn('durability', FormFieldType.FLOAT),
    CreateColumn('strength', FormFieldType.FLOAT),
    CreateColumn('availability', FormFieldType.TEXT),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('priceMultiplier', FormFieldType.FLOAT),
    CreateFormField('weight', FormFieldType.FLOAT),
    CreateFormField('durability', FormFieldType.FLOAT),
    CreateFormField('strength', FormFieldType.FLOAT),
    CreateFormField('availability', FormFieldType.ENUM_SELECT, availabilityEntityName),
]);