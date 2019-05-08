import Price from "../../../world/money/Price";
import Resource from "../../resource/Resource";
import {Placement} from "../../Placement";
import DeterminantConteiner from "../../../../crud/DeterminantConteiner";

export default class Jewelry extends DeterminantConteiner {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    accessibility: string = 'COMMON';
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