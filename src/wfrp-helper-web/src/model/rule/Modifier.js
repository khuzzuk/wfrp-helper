import DiceRoll from "./DiceRoll";
import Entity from "../Entity";

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

  updateWith(entity: Modifier): Modifier {
    super.updateWith(entity);
    this.updateEntityList(entity, 'rolls', () => new DiceRoll());
    return this;
  }

  toString() {
    return this.type + ' ' + this.value + ' ' + this.rolls.map(
        roll => roll.toString()).join(' ')
  }
}

export default Modifier;
