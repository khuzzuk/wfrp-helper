import Entity from "../../../crud/Entity";
import Nation from "../nation/Nation";

class Language extends Entity {
    name: string;
    description: string;
    nations: Nation[];

    updateWith(entity: *) {
        super.updateWith(entity);
        this.updateEntityList(entity, 'nations', () => new Nation());
    }
}

export default Language;