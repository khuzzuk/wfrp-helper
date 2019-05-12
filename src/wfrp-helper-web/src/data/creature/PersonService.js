import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
import NationService from "../world/nation/NationService";
import Person from "./Person";
import {Gender} from "./Gender";
import HairColor from "../look/hairColor/HairColor";
import HairColorService from "../look/hairColor/HairColorService";
import Race from "../world/race/Race";
import RaceService from "../world/race/RaceService";
import ProfessionClass from "../knowledge/profession/ProfessionClass";
import ProfessionClassService from "../knowledge/profession/ProfessionClassService";
import ProfessionService from "../knowledge/profession/ProfessionService";
import Profession from "../knowledge/profession/Profession";
import CharacterService from "../look/character/CharacterService";
import Character from "../look/character/Character";
import EyeColor from "../look/eyeColor/EyeColor";
import EyeColorService from "../look/eyeColor/EyeColorService";
import PhysicalFeatureService from "../look/physicalFeatures/PhysicalFeatureService";
import PhysicalFeature from "../look/physicalFeatures/PhysicalFeature";

export default class PersonService extends ConnectionService {
    title: string = 'Person';
    data: Person[] = [];
    hairColors: HairColor[] = [];
    eyeColors: EyeColor[] = [];
    races: Race[] = [];
    professionClasses: ProfessionClass[] = [];
    professions: Profession[] = [];
    characters: Character[] = [];
    physicalFeatures: PhysicalFeature[] = [];

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
        label: 'Gender',
        name: 'gender',
        type: NationService.FormFieldType.ENUM_SELECT,
        suggestions: Gender.allOf()
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }];

    constructor(action) {
        super('person', action);

        const hairColorService = new HairColorService(this.onRetrieveRelatedData(this.hairColors));
        const eyeColorService = new EyeColorService(this.onRetrieveRelatedData(this.eyeColors));
        const raceService = new RaceService(this.onRetrieveRelatedData(this.races));
        const professionClassService = new ProfessionClassService(this.onRetrieveRelatedData(this.professionClasses));
        const professionService = new ProfessionService(this.onRetrieveRelatedData(this.professions));
        const characterService = new CharacterService(this.onRetrieveRelatedData(this.characters));
        const physicalFeatureService = new PhysicalFeatureService(this.onRetrieveRelatedData(this.physicalFeatures));

        this.registerRelatedServices([hairColorService, eyeColorService,
            raceService, professionClassService, professionService,
            characterService, physicalFeatureService]);
    }

    createNew(): Person {
        this.entity = new Person();
        return this.entity;
    }
}