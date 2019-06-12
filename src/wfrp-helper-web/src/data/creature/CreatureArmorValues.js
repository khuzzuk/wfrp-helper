import {Placement} from "../crafting/Placement";

export default class CreatureArmorValues {
    armorValues: Map<string, number>;


    constructor() {
        this.armorValues = new Map();
        Placement.allOf().forEach(placement => {
            this.armorValues.set(placement, 0);
        })
    }

    getArmorValue(placement: string): number {
        return this.armorValues.get(placement);
    }

    updateWith(values: CreatureArmorValues) {
        this.armorValues = new Map();
        Placement.allOf().map(placement => this.armorValues.set(placement, values[placement]));
    }
}