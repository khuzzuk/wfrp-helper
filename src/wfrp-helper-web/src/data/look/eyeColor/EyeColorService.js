import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import EyeColor from "./EyeColor";

export default class EyeColorService extends ConnectionService {
    title = 'Eye color';
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
        super('eyeColor');
    }

    createNew(): EyeColor {
        this.entity = new EyeColor();
        return this.entity;
    }
}