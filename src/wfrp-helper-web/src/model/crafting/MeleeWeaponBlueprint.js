import DeterminantContainer from "../rule/DeterminantContainer";
import Price from "../world/Price";
import Modifier from "../rule/Modifier";
import ActionTime from "../rule/ActionTime";
import {CreateColumn, CreateFormField, RegisterEntity} from "../Entity";
import {FormFieldType} from "../../form/FormFieldType";
import {Placement, placementWeaponName} from "./Placement";

export default class MeleeWeaponBlueprint extends DeterminantContainer {
    static entityName: string = 'meleeWeaponBlueprint';

    name: string;
    description: string;
    suggestedPrice: Price = new Price();
    suggestedWeight: number;
    damage: Modifier = new Modifier();
    prepareTime: ActionTime = new ActionTime();
    placement: string = Placement.HAND;

    updateWith(entity: MeleeWeaponBlueprint): MeleeWeaponBlueprint {
        super.updateWith(entity);
        this.updateEntityProp(entity, 'suggestedPrice', () => new Price());
        this.updateEntityProp(entity, 'damage', () => new Modifier());
        this.updateEntityProp(entity, 'prepareTime', () => new ActionTime());
        return this;
    }
}

RegisterEntity(MeleeWeaponBlueprint, [
    CreateColumn('name', FormFieldType.TEXT),
    CreateColumn('description', FormFieldType.TEXT_AREA),
    CreateColumn('damage', FormFieldType.MODIFIER),
    CreateColumn('placement', FormFieldType.TEXT),
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
    CreateFormField('determinantes', FormFieldType.DETERMINANT),
]);