import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
import SkillService from "../skill/SkillService";
import Profession from "./Profession";
import ProfessionClass from "./ProfessionClass";
import Skill from "../skill/Skill";
import ProfessionClassService from "./ProfessionClassService";

export default class ProfessionService extends ConnectionService {
    title = 'Profession';
    data: Profession[] = [];
    professionClasses: ProfessionClass[] = [];
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
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }, {
        label: 'Profession Class',
        name: 'professionClass',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.professionClasses
    }, {
        label: 'Skills',
        name: 'skills',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.skills
    }];

    constructor(action) {
        super('profession', action);

        const skillService = new SkillService(this.onRetrieveRelatedData(this.skills));
        const professionClassService = new ProfessionClassService(this.onRetrieveRelatedData(this.professionClasses));

        this.registerRelatedServices([skillService, professionClassService]);
    }

    createNew(): Profession {
        this.entity = new Profession();
        return this.entity;
    }
}