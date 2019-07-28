import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
import Skill from "./Skill";

class SkillService extends ConnectionService {
    title = 'Skill';
    data = [];
    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
            type: NationService.FormFieldType.TEXT
        }, {
            label: 'Description',
            name: 'description',
            type: NationService.FormFieldType.TEXT_AREA
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
    }];

    constructor() {
        super('skill');
    }

    createNew(): Skill {
        this.entity = new Skill();
        return this.entity;
    }
}

export default SkillService;