import Entity from "../../../../crud/Entity";
import Price from "../../../world/money/Price";
import Determinant from "../../../rule/Determinant";
import Resource from "../../resource/Resource";
import {Placement} from "../../Placement";

export default class Jewelry extends Entity {
    name: string;
    description: string;
    weight: number;
    price: Price = new Price();
    accessibility: string = 'COMMON';
    determinants: Determinant[] = [];
    primaryResource: Resource;
    secondaryResource: Resource;
    placement: string = Placement.NECK;

    updateWith(entity: *) {
        super.updateWith(entity);

        if (entity.determinants) {
            this.determinants = entity.determinants
                .map(value => {
                    const det = new Determinant();
                    det.updateWith(value);
                    return det;
                })
        }

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