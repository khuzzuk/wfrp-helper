import Entity from "../../../crud/Entity";
import Skill from "../skill/Skill";

export default class ProfessionClass extends Entity {
    name: string;
    description: string;
    skills: Skill[] = [];

    updateWith(entity: ProfessionClass) {
        super.updateWith(entity);
        this.updateEntityList(entity, 'skills', new Skill());
    }
}