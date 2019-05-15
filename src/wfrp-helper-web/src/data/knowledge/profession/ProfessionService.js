import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
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
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Opis',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Rozwinięcia',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }, {
        label: 'Klasa',
        name: 'professionClass',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.professionClasses
    }, {
        label: 'Umiejętności',
        name: 'skills',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.skills
    }, {
        label: 'Profesje wyjściowe',
        name: 'nextProfessions',
        type: NationService.FormFieldType.ENTITY_COMBOBOX,
        suggestions: this.data
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


    save(entity: object, onSuccess: func) {
        const toSave = new Profession();
        toSave.updateWith(entity);
        toSave.nextProfessions = toSave.nextProfessions.map(prof => prof.name);
        super.save(toSave, onSuccess);
    }
}