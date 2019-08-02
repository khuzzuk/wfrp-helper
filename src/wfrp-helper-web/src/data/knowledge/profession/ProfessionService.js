import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import SkillService from "../skill/SkillService";
import Profession from "./Profession";
import ProfessionClass from "./ProfessionClass";
import Skill from "../skill/Skill";
import ProfessionClassService from "./ProfessionClassService";

export default class ProfessionService extends ConnectionService {
    title = 'Profesja';
    data: Profession[] = [];
    professionClasses: ProfessionClass[] = [];
    skills: Skill[] = [];
    nextProfessions: string[] = [];

    tableColumns: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
    }, {
        label: 'Opis',
        name: 'description',
    }];

    formFields: FormFieldData[] = [{
        label: 'Nazwa',
        name: 'name',
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Rozwinięcia',
        name: 'determinants',
        type: ConnectionService.FormFieldType.DETERMINANT,
    }, {
        label: 'Klasa',
        name: 'professionClass',
        type: ConnectionService.FormFieldType.ENTITY_SELECT,
        suggestions: this.professionClasses
    }, {
        label: 'Umiejętności',
        name: 'skills',
        type: ConnectionService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.skills
    }, {
        label: 'Profesje wyjściowe',
        name: 'nextProfessions',
        type: ConnectionService.FormFieldType.ENUM_COMBOBOX,
        suggestions: this.nextProfessions
    }];

    constructor(action) {
        super('profession', action);

        const skillService = new SkillService(this.onRetrieveRelatedData(this.skills));
        const professionClassService = new ProfessionClassService(this.onRetrieveRelatedData(this.professionClasses));

        this.registerRelatedServices([skillService, professionClassService]);

        this.addDataListener(this.possibleNextProfessions);
    }

    createNew(): Profession {
        this.entity = new Profession();
        return this.entity;
    }

    possibleNextProfessions = data => {
        this.nextProfessions.length = 0;
        data.map(profession => profession.name)
            .forEach(name => this.nextProfessions.push(name));
    };
}