import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import {Placement} from "../../Placement";
import ResourceService from "../../resource/ResourceService";
import Jewelry from "./Jewelry";
import Availability from "../../../rule/Availability";

export default class JewelryService extends ConnectionService {
    title = 'Jewelry';
    data = [];
    resources = [];

    tableColumns: FormFieldData[] = [
        {
            label: 'Name',
            name: 'name',
        }, {
            label: 'Description',
            name: 'description',
        }, {
            label: 'Price',
            name: 'price',
            getter: price => price && (price.gold + 'g, ' + price.silver + 's, ' + price.lead + 'l')
        }, {
            label: 'Availability',
            name: 'availability',
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
        label: 'Weight',
        name: 'weight',
        type: ConnectionService.FormFieldType.FLOAT
    }, {
        label: 'Price',
        name: 'price',
        type: ConnectionService.FormFieldType.PRICE
    }, {
        label: 'Availability',
        name: 'availability',
        type: ConnectionService.FormFieldType.ENUM_SELECT,
        suggestions: Availability
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: ConnectionService.FormFieldType.DETERMINANT,
    }, {
        label: 'Primary resource',
        name: 'primaryResource',
        type: ConnectionService.FormFieldType.ENTITY_SELECT,
        suggestions: this.resources
    }, {
        label: 'Secondary resource',
        name: 'secondaryResource',
        type: ConnectionService.FormFieldType.ENTITY_SELECT,
        suggestions: this.resources
    }, {
        label: 'Placement',
        name: 'placement',
        type: ConnectionService.FormFieldType.ENUM_SELECT,
        suggestions: Placement.jewelry()
    }];

    constructor(action) {
        super('jewelry', action);

        const resourceService = new ResourceService(this.onRetrieveRelatedData(this.resources));
        this.registerRelatedServices([resourceService]);
    }

    createNew(): Jewelry {
        this.entity = new Jewelry();
        return this.entity;
    }
}