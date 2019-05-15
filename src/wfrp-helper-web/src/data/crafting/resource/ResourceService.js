import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
import Resource from "./Resource";
import Availability from "../../rule/Availability";

class ResourceService extends ConnectionService {
    title = 'Resource';
    data = [];
    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }, {
            label: 'Availability',
            name: 'availability',
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
        label: 'Price multiplier',
        name: 'priceMultiplier',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Weight',
        name: 'weight',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Durability',
        name: 'durability',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Strength',
        name: 'strength',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Availability',
        name: 'availability',
        type: NationService.FormFieldType.ENUM_SELECT,
        suggestions: Availability
    }];

    constructor(action) {
        super('resource', action);
    }

    createNew(): Resource {
        this.entity = new Resource();
        return this.entity;
    }
}

export default ResourceService;