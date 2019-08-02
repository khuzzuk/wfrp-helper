import ConnectionService from "../../connection/ConnectionService";
import FormFieldData from "../../crud/FormFieldData";
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
        type: ConnectionService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: ConnectionService.FormFieldType.TEXT_AREA
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: ConnectionService.FormFieldType.DETERMINANT,
    }];

    constructor() {
        super('animalKind');
    }

    createNew(): AnimalKind {
        this.entity = new AnimalKind();
        return this.entity;
    }
}