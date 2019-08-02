import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import Spell from "./Spell";

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
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Effect',
        name: 'effect',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Level',
        name: 'level',
        type: ConnectionService.FormFieldType.INTEGER
    }, {
        label: 'Mana cost',
        name: 'manaCost',
        type: ConnectionService.FormFieldType.INTEGER
    }, {
        label: 'Range',
        name: 'range',
        type: ConnectionService.FormFieldType.INTEGER
    }, {
        label: 'Prepare time',
        name: 'prepareTime',
        type: ConnectionService.FormFieldType.ACTION_TIME
    }, {
        label: 'Duration time',
        name: 'durationTime',
        type: ConnectionService.FormFieldType.ACTION_TIME
    }, {
        label: 'Spell school',
        name: 'spellSchool',
        type: ConnectionService.FormFieldType.ENTITY_SELECT,
        suggestions: this.spellSchools
    }, {
        label: 'Ingredients',
        name: 'ingredients',
        type: ConnectionService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.items
    }];

    constructor() {
        super('spell');
    }

    createNew(): Spell {
        this.entity = new Spell();
        return this.entity;
    }
}