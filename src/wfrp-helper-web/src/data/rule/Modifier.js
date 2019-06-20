import Entity from "../../crud/Entity";
import DiceRoll from "./DiceRoll";

export const ModifierType = {
    REGULAR: 'REGULAR',
    PROFESSION: 'PROFESSION',
    EXPERIENCE: 'EXPERIENCE',
    DICE: 'DICE',

    allOf() {
        return [
            this.REGULAR,
            this.PROFESSION,
            this.EXPERIENCE,
            this.DICE,
        ];
    }
};

class Modifier extends Entity {
    value: number;
    type: string = ModifierType.REGULAR;
    rolls: DiceRoll[] = [];

    updateWith(entity: Modifier) {
        super.updateWith(entity);
        this.updateEntityList(entity, 'rolls', () => new DiceRoll());
    }
}

export default Modifier;
