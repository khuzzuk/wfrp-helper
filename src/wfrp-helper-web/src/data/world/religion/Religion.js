import Entity from "../../../crud/Entity";
import Nation from "../nation/Nation";

export default class Religion extends Entity {
    name: string;
    nations: Nation[] = [];


    updateWith(entity: Religion) {
        super.updateWith(entity);
        this.updateEntityList(entity, 'nations', () => new Nation());
    }
}