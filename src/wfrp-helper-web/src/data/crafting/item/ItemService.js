import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import NationService from "../../world/nation/NationService";
import Accessibility from "../../rule/Accessibility";
import Item from "./Item";

class ItemService extends ConnectionService {
    title = 'Item';
    data = [];
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
            getter: price => price.gold + 'g, ' + price.silver + 's, ' + price.lead + 'l'
        }, {
            label: 'Accessibility',
            name: 'accessibility',
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
        label: 'Accessibility',
        name: 'accessibility',
        type: NationService.FormFieldType.ENUM_SELECT,
        suggestions: Accessibility
    }];

    constructor(action) {
        super('miscItem', action);
    }

    createNew(): Item {
        this.entity = new Item();
        return this.entity;
    }
}

export default ItemService;