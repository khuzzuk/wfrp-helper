import DeterminantContainer from "../rule/DeterminantContainer";
import Price from "../world/Price";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";
import {placementArmorName} from "./Placement";

export default class ArmorBlueprint extends DeterminantContainer {
    static entityName: string = 'armorBlueprint';

    name: string;
    description: string;
    armor: number;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    placement: string[] = [];

    updateWith(entity: DeterminantContainer): ArmorBlueprint {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'suggestedPrice', () => new Price());
        return this;
    }
}

RegisterEntity(ArmorBlueprint, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('armor', FormFieldType.INTEGER),
    CreateColumn('placement', FormFieldType.TEXT),
    CreateColumn('suggestedPrice', FormFieldType.PRICE),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('armor', FormFieldType.INTEGER),
    CreateFormField('suggestedPrice', FormFieldType.PRICE),
    CreateFormField('suggestedWeight', FormFieldType.INTEGER),
    CreateFormField('placement', FormFieldType.ENUM_COMBOBOX, placementArmorName),
    CreateFormField('determinants', FormFieldType.DETERMINANT),
]);