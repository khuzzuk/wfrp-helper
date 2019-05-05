import Entity from "../../../crud/Entity";
import Skill from "../skill/Skill";

export default class ProfessionClass extends Entity {
    name: string;
    description: string;
    skills: Skill[] = [];

    updateWith(entity: ProfessionClass) {
        super.updateWith(entity);

        if (entity.skills) {
            this.skills = entity.skills
                .map(skill => {
                    const newSkill = new Skill();
                    newSkill.updateWith(skill);
                    return skill;
                });
        }
    }
}