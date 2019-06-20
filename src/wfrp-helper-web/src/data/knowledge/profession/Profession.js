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
        this.updateEntityProp(entity, 'professionClass', () => new ProfessionClass());
        this.updateEntityList(entity, 'skills', () => new Skill());
    }
}