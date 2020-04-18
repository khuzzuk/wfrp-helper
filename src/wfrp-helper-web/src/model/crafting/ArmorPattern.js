import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {Availability, availabilityEntityName} from "./Availability";
import {FormFieldType} from "../../form/FormFieldType";

export default class ArmorPattern extends Entity {
    static entityName: string = 'armorPattern';

    name: string;
    description: string;
    priceMultiplier: number;
    weight: number;
    strength: number;
    availability: string = Availability[0];
}

RegisterEntity(ArmorPattern, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('strength', FormFieldType.INTEGER),
    CreateColumn('availability', FormFieldType.TEXT),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('priceMultiplier', FormFieldType.FLOAT),
    CreateFormField('weight', FormFieldType.FLOAT),
    CreateFormField('strength', FormFieldType.FLOAT),
    CreateFormField('availability', FormFieldType.ENUM_SELECT, availabilityEntityName),
]);