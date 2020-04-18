import DeterminantContainer from "../rule/DeterminantContainer";
import Price from "../world/Price";
import Modifier from "../rule/Modifier";
import ActionTime from "../rule/ActionTime";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";
import {Placement, placementWeaponName} from "./Placement";

export default class RangedWeaponBlueprint extends DeterminantContainer {
    static entityName: string = 'rangedWeaponBlueprint';

    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    damage: Modifier = new Modifier();
    prepareTime: ActionTime = new ActionTime();
    placement: string[] = [Placement.HAND];
    minimumRange: number = 0;
    mediumRange: number = 0;
    maximumRange: number = 0;

    updateWith(entity: RangedWeaponBlueprint): RangedWeaponBlueprint {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'suggestedPrice', () => new Price());
        this.updateEntityProp(entity, 'damage', () => new Modifier());
        this.updateEntityProp(entity, 'prepareTime', () => new ActionTime());
        return this;
    }
}

RegisterEntity(RangedWeaponBlueprint, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('damage', FormFieldType.MODIFIER),
    CreateColumn('minimumRange', FormFieldType.INTEGER),
    CreateColumn('mediumRange', FormFieldType.INTEGER),
    CreateColumn('maximumRange', FormFieldType.INTEGER),
    CreateColumn('prepareTime', FormFieldType.ACTION_TIME),
    CreateColumn('suggestedPrice', FormFieldType.PRICE),
    CreateColumn('suggestedWeight', FormFieldType.FLOAT),
], [
    CreateFormField('name', FormFieldType.TEXT),
    CreateFormField('description', FormFieldType.TEXT_AREA),
    CreateFormField('suggestedPrice', FormFieldType.PRICE),
    CreateFormField('suggestedWeight', FormFieldType.INTEGER),
    CreateFormField('damage', FormFieldType.MODIFIER),
    CreateFormField('prepareTime', FormFieldType.ACTION_TIME),
    CreateFormField('placement', FormFieldType.ENUM_COMBOBOX, placementWeaponName),
    CreateFormField('minimumRange', FormFieldType.INTEGER),
    CreateFormField('mediumRange', FormFieldType.INTEGER),
    CreateFormField('maximumRange', FormFieldType.INTEGER),
    CreateFormField('determinants', FormFieldType.DETERMINANT),
]);