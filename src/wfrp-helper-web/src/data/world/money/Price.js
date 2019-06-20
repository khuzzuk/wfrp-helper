class Price {
    gold: number = 0;
    silver: number = 0;
    lead: number = 0;

    toString() {
        return this.gold + ' ' + this.silver + ' ' + this.lead;
    }

    updateWith(price: Price) {
        Object.assign(this, price);
    }
}

export default Price;