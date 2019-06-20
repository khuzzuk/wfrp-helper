export default class ModelElement {
    updateWith(entity: any) {
        Object.assign(this, entity);
    }

    updateProp(entity: any, prop: string) {
        if (entity[prop]) {
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