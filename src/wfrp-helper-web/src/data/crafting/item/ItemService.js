import ConnectionService from "../../../connection/ConnectionService";
import FormFieldData from "../../../crud/FormFieldData";
import Item from "./Item";
import Availability from "../../rule/Availability";

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
    }];

    constructor() {
        super('miscItem');
    }

    createNew(): Item {
        this.entity = new Item();
        return this.entity;
    }
}

export default ItemService;