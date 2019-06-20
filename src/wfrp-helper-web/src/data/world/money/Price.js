import ModelElement from "../../../crud/ModelElement";

export default class Price extends ModelElement {
    gold: number = 0;
    silver: number = 0;
    lead: number = 0;

    toString() {
        return this.gold + ' ' + this.silver + ' ' + this.lead;
    }
}
