class Entity {
    id: number;
    version: number;

    updateWith(entity: any) {
        Object.assign(this, entity);
    }
}

export default Entity;