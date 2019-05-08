import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
import NationService from "../world/nation/NationService";
import AnimalKind from "./AnimalKind";

export default class AnimalKindService extends ConnectionService {
    title = 'Armor blueprint';
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
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }];

    constructor(action) {
        super('animalKind', action);
    }

    createNew(): AnimalKind {
        this.entity = new AnimalKind();
        return this.entity;
    }
}