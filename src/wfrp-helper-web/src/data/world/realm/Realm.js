import Entity from "../../../crud/Entity";
import Nation from "../nation/Nation";
import Person from "../../creature/Person";

export default class Realm extends Entity {
    name: string;
    nations: Nation[] = [];
    persons: Person[] = [];

    updateWith(entity: Realm) {
        super.updateWith(entity);
        this.updateEntityList(entity, 'nations', () => new Nation());
        this.updateEntityList(entity, 'persons', () => new Person());
    }
}