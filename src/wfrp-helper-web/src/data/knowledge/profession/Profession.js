import Entity from "../../../crud/Entity";
import Skill from "../skill/Skill";
import Determinant from "../../rule/Determinant";
import ProfessionClass from "./ProfessionClass";

export default class Profession extends Entity {
    name: string;
    description: string;
    professionClass: ProfessionClass;
    determinants: Determinant[] = [];
    skills: Skill[] = [];

    updateWith(entity: Profession) {
        super.updateWith(entity);

        if (entity.professionClass) {
            this.professionClass = new ProfessionClass();
            this.professionClass.updateWith(entity.professionClass);
        }

        if (entity.determinants) {

            this.determinants = entity.determinants
                .map(value => {
                    const det = new Determinant();
                    det.updateWith(value);
                    return det;
                });
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