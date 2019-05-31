import Skill from "../skill/Skill";
import ProfessionClass from "./ProfessionClass";
import DeterminantContainer from "../../../crud/DeterminantContainer";

export default class Profession extends DeterminantContainer {
    name: string;
    description: string;
    professionClass: ProfessionClass;
    skills: Skill[] = [];
    nextProfessions: Profession[] = [];

    updateWith(entity: Profession) {
        super.updateWith(entity);

        if (entity.professionClass) {
            this.professionClass = new ProfessionClass();
            this.professionClass.updateWith(entity.professionClass);
        }

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