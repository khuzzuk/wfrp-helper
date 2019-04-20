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

        if (entity.rolls) {
            this.rolls = entity.rolls
                .map(roll => {
                    const newRoll = new DiceRoll();
                    newRoll.updateWith(roll);
                    return newRoll;
                })
        }
    }
}

export default Modifier;
