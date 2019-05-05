import ConnectionService from "../../../connection/ConnectionService";
import Profession from "./Profession";
import ProfessionClass from "./ProfessionClass";
import Skill from "../skill/Skill";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
import SkillService from "../skill/SkillService";

export default class ProfessionClassService extends ConnectionService {
    title = 'Profession class';
    data: ProfessionClass[] = [];
    professions: Profession[] = [];
    skills: Skill[] = [];

    tableColumns: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
    }, {
        label: 'Description',
        name: 'description',
    }];

    formFields: FormFieldData[] = [{
        label: 'Name',
        name: 'name',
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Skills',
        name: 'skills',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.skills
    }];

    constructor(action) {
        super('professionClass', action);

        const skillService = new SkillService(this.onRetrieveRelatedData(this.skills));

        this.registerRelatedServices([skillService]);
    }

    createNew(): Profession {
        this.entity = new Profession();
        return this.entity;
    }

}