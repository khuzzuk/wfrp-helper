import Entity from "../../../crud/Entity";
import Nation from "../nation/Nation";

export default class Religion extends Entity {
    name: string;
    nations: Nation[] = [];


    updateWith(entity: Religion) {
        super.updateWith(entity);
        if (entity.nations) {
            this.nations = entity.nations
                .map(nation => {
                    const newNation = new Nation();
                    newNation.updateWith(nation);
                    return newNation;
                });
        }
    }
}