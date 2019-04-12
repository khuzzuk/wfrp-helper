import Entity from "../../crud/Entity";
import DiceRoll from "./DiceRoll";

class Modifier extends Entity {
    value: number;
    type: ModifierType = ModifierType.REGULAR;
    rolls: DiceRoll[];
}

export default Modifier;

export const ModifierType = {
    REGULAR: 'REGULAR',
    PROFESSION: 'PROFESSION',
    EXPERIENCE: 'EXPERIENCE',
    DICE: 'DICE',
};
