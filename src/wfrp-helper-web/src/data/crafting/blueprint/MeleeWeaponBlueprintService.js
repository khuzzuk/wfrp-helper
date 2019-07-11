import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
import {Placement} from "../Placement";
import MeleeWeaponBlueprint from "./MeleeWeaponBlueprint";

export default class MeleeWeaponBlueprintService extends ConnectionService {
    domain = 'meleeWeaponBlueprint';
    title = 'Melee weapon blueprint';
    data = [];

    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }, {
            label: 'Suggested price',
            name: 'suggestedPrice',
            getter: price => price && (price.gold + 'g, ' + price.silver + 's, ' + price.lead + 'l')
        }, {
            label: 'Placement',
            name: 'placement',
        }
    ];

    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Weight',
        name: 'weight',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Suggested price',
        name: 'suggestedPrice',
        type: NationService.FormFieldType.PRICE
    }, {
        label: 'Placement',
        name: 'placement',
        type: NationService.FormFieldType.ENUM_COMBOBOX,
        suggestions: Placement.weapon()
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }, {
        label: 'Damage',
        name: 'damage',
        type: NationService.FormFieldType.MODIFIER,
    }, {
        label: 'Prepare time',
        name: 'prepareTime',
        type: NationService.FormFieldType.ACTION_TIME,
    }];

    constructor(action) {
        super(action);
    }

    createNew(): MeleeWeaponBlueprint {
        this.entity = new MeleeWeaponBlueprint();
        return this.entity;
    }
}