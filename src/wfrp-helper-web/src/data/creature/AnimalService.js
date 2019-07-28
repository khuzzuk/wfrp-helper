import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
import NationService from "../world/nation/NationService";
import AnimalKind from "./AnimalKind";
import Animal from "./Animal";

export default class AnimalService extends ConnectionService {
    title = 'Armor blueprint';
    data = [];
    animalKinds: AnimalKind[] = [];

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
        label: 'Animal Kind',
        name: 'animalKind',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.animalKinds
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }];

    constructor() {
        super('animal');
    }

    createNew(): Animal {
        this.entity = new Animal();
        return this.entity;
    }
}