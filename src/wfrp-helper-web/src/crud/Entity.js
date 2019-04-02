class Entity {
    id: number;
    version: number;
    uuid: string;

    updateWith(entity: any) {
        Object.assign(this, entity);
    }
}

export default Entity;