import Entity, {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import Price from "../world/Price";
import {FormFieldType} from "../../form/FormFieldType";
import {availabilityEntityName} from "./Availability";

export default class Item extends Entity {
    static entityName: string = 'miscItem';

    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';


    updateWith(entity: *): Item {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'price', () => new Price());
        return this;
    }
}

RegisterEntity(Item, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('weight', FormFieldType.FLOAT),
    CreateColumn('price', FormFieldType.PRICE),
    CreateColumn('availability', FormFieldType.ENUM_SELECT),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('weight', FormFieldType.FLOAT),
    CreateFormField('price', FormFieldType.PRICE),
    CreateFormField('availability', FormFieldType.ENUM_SELECT, availabilityEntityName),
]);