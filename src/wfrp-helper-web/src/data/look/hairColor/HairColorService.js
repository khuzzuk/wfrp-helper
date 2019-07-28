import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import HairColor from "./HairColor";

export default class HairColorService extends ConnectionService {
    title = 'Hair color';
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
    }];

    constructor() {
        super('hairColor');
    }

    createNew(): HairColor {
        this.entity = new HairColor();
        return this.entity;
    }
}