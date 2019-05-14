import ConnectionService from "../../../../connection/ConnectionService";
import FormFieldData from "../../../../crud/FormFieldData";
import NationService from "../../../world/nation/NationService";
import Accessibility from "../../../rule/Accessibility";
import {Placement} from "../../Placement";
import ResourceService from "../../resource/ResourceService";
import Jewelry from "./Jewelry";

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
        type: NationService.FormFieldType.TEXT
    }, {
        label: 'Description',
        name: 'description',
        type: NationService.FormFieldType.TEXT_AREA
    }, {
        label: 'Weight',
        name: 'weight',
        type: NationService.FormFieldType.FLOAT
    }, {
        label: 'Price',
        name: 'price',
        type: NationService.FormFieldType.PRICE
    }, {
        label: 'Availability',
        name: 'availability',
        type: NationService.FormFieldType.ENUM_SELECT,
        suggestions: Accessibility
    }, {
        label: 'Determinants',
        name: 'determinants',
        type: NationService.FormFieldType.DETERMINANT,
    }, {
        label: 'Primary resource',
        name: 'primaryResource',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.resources
    }, {
        label: 'Secondary resource',
        name: 'secondaryResource',
        type: NationService.FormFieldType.ENTITY_SELECT,
        suggestions: this.resources
    }, {
        label: 'Placement',
        name: 'placement',
        type: NationService.FormFieldType.ENUM_SELECT,
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