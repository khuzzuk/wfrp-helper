import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
import NationService from "../world/nation/NationService";
import Person from "./Person";
import {Gender} from "./Gender";
import HairColor from "../look/hairColor/HairColor";
import HairColorService from "../look/hairColor/HairColorService";

export default class PersonService extends ConnectionService {
    title: string = 'Person';
    data: Person[] = [];
    hairColors: HairColor[] = [];

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

        this.registerRelatedServices([hairColorService]);
    }

    createNew(): Person {
        this.entity = new Person();
        return this.entity;
    }
}