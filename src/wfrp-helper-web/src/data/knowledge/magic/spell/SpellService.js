import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import NationService from "../../../world/nation/NationService";
import Spell from "./Spell";
import ItemService from "../../../crafting/item/ItemService";
import SpellSchoolService from "../spellSchool/SpellSchoolService";

export default class SpellService extends ConnectionService {
    title = 'Ranged weapon';
    data = [];
    spellSchools = [];
    items = [];

    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
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
        label: 'Effect',
        name: 'effect',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Level',
        name: 'level',
        type: NationService.FormFieldType.INTEGER
    }, {
        label: 'Mana cost',
        name: 'manaCost',
        type: NationService.FormFieldType.INTEGER
    }, {
        label: 'Range',
        name: 'range',
        type: NationService.FormFieldType.INTEGER
    }, {
        label: 'Prepare time',
        name: 'prepareTime',
        type: NationService.FormFieldType.ACTION_TIME
    }, {
        label: 'Duration time',
        name: 'durationTime',
        type: NationService.FormFieldType.ACTION_TIME
    }, {
        label: 'Spell school',
        name: 'spellSchool',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.spellSchools
    }, {
        label: 'Ingredients',
        name: 'ingredients',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.items
    }];

    constructor(action) {
        super('spell', action);

        const itemService = new ItemService(this.onRetrieveRelatedData(this.items));
        const spellSchoolService = new SpellSchoolService(this.onRetrieveRelatedData(this.spellSchools));
        this.registerRelatedServices([itemService, spellSchoolService]);
    }

    createNew(): Spell {
        this.entity = new Spell();
        return this.entity;
    }
}