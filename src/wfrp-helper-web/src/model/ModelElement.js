export default class ModelElement {
    updateWith(entity: any): ModelElement {
        Object.assign(this, entity);
        return this;
    }

    updateProp(entity: any, prop: string) {
        if (entity[prop] || entity[prop] === '') {
            this[prop] = entity[prop];
        }
    }

    updateNumProp(entity: any, prop: string) {
        if (entity[prop] || entity[prop] === 0 || entity[prop] === '') {
            this[prop] = entity[prop];
        }
    }

    updateEntityProp(entity: any, prop: string, supplier: () => mixed) {
        if (entity[prop]) {
            this[prop] = supplier();
            this[prop].updateWith(entity[prop]);
        }
    }

    updateEntityList(entity: any, prop: string, supplier: () => mixed) {
        if (entity[prop]) {
            this[prop] = entity[prop]
                .map(val => {
                    const newVal = supplier();
                    newVal.updateWith(val);
                    return newVal;
                });
        }
    }
}