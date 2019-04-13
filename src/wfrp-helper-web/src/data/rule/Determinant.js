import Entity from "../../crud/Entity";
import Modifier from "./Modifier";

class Determinant extends  Entity {
    type: string;
    value: number;
    modifiers: Modifier = [];
}

export default Determinant;

export const DeterminantType = {
    SPEED: 'SPEED',
    BATTLE: 'BATTLE',
    SHOOTING: 'SHOOTING',
    STRENGTH: 'STRENGTH',
    DURABILITY: 'DURABILITY',
    HEALTH: 'HEALTH',
    INITIATIVE: 'INITIATIVE',
    ATTACK: 'ATTACK',
    DEXTERITY: 'DEXTERITY',
    LEADER_SKILLS: 'LEADER_SKILLS',
    INTELLIGENCE: 'INTELLIGENCE',
    CONTROL: 'CONTROL',
    WILL: 'WILL',
    CHARISMA: 'CHARISMA',
    PARRY: 'PARRY',
    OPPONENT_PARRY: 'OPPONENT_PARRY',

    allOf() : string[] {
        return [
            this.SPEED,
            this.BATTLE,
            this.SHOOTING,
            this.STRENGTH,
            this.DURABILITY,
            this.HEALTH,
            this.INITIATIVE,
            this.ATTACK,
            this.DEXTERITY,
            this.LEADER_SKILLS,
            this.INTELLIGENCE,
            this.CONTROL,
            this.WILL,
            this.CHARISMA,
            this.PARRY,
            this.OPPONENT_PARRY,
        ];
    }
};
