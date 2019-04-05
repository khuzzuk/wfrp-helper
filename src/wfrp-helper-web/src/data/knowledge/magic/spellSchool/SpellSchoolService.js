import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import NationService from "../../../world/nation/NationService";
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
        label: 'Levels',
        name: 'levels',
        type: NationService.FormFieldType.INTEGER
    }];

    constructor(action) {
        super('spellSchool', action);
    }

    createNew(): SpellSchool {
        this.entity = new SpellSchool();
        return this.entity;
    }
}

export default SpellSchoolService;