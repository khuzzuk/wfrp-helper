class Price {
    gold: number = 0;
    silver: number = 0;
    lead: number = 0;

    toString() {
        return this.gold + ' ' + this.silver + ' ' + this.lead;
    }
}

export default Price;