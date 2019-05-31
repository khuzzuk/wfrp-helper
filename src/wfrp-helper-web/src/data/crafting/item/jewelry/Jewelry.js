import Price from "../../../world/money/Price";
import Resource from "../../resource/Resource";
import {Placement} from "../../Placement";
import DeterminantContainer from "../../../../crud/DeterminantContainer";

export default class Jewelry extends DeterminantContainer {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    availability: string = 'COMMON';
    primaryResource: Resource;
    secondaryResource: Resource;
    placement: string = Placement.NECK;

    updateWith(entity: *) {
        super.updateWith(entity);

        if (entity.primaryResource) {
            this.primaryResource = new Resource();
            this.primaryResource.updateWith(entity.primaryResource);
        }
        if (entity.secondaryResource) {
            this.secondaryResource = new Resource();
            this.secondaryResource.updateWith(entity.secondaryResource);
        }
    }
}