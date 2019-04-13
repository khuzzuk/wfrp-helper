import Entity from "../../crud/Entity";
import DiceRoll from "./DiceRoll";

export const ModifierType = {
    REGULAR: 'REGULAR',
    PROFESSION: 'PROFESSION',
    EXPERIENCE: 'EXPERIENCE',
    DICE: 'DICE',
};

class Modifier extends Entity {
    value: number;
    type: string = ModifierType.REGULAR;
    rolls: DiceRoll[];
}

export default Modifier;
