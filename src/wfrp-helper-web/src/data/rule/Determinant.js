import Entity from "../../crud/Entity";
import Modifier, {ModifierType} from "./Modifier";

export default class Determinant extends Entity {
    type: string;
    value: number;
    modifiers: Modifier[] = [];

    updateWith(entity: Determinant) {
        super.updateWith(entity);
        if (entity.modifiers) {
            this.modifiers = entity.modifiers
                .map(modifier => {
                    const mod = new Modifier();
                    mod.updateWith(modifier);
                    return mod;
                });
        }
    }

    getExperienceExtensions() {
        return this.modifiers.filter(mod => mod.type === ModifierType.EXPERIENCE)
    }
}

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

    allOf(): string[] {
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
    },
    personal(): string[] {
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
        ];
    }
};
