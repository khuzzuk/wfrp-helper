import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import SpellSchool from "./SpellSchool";

class SpellSchoolService extends ConnectionService {
    title = 'Spell School';
    data = [];
    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }, {
            label: 'Levels',
            name: 'levels',
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
        label: 'Levels',
        name: 'levels',
        type: ConnectionService.FormFieldType.INTEGER
    }];

    constructor() {
        super('spellSchool');
    }

    createNew(): SpellSchool {
        this.entity = new SpellSchool();
        return this.entity;
    }
}

export default SpellSchoolService;