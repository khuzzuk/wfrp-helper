import {DescribedEntity} from "../DescribedEntity";
import {Skill} from "./Skill";

export class ProfessionClass extends DescribedEntity {
    skills: Skill[] = [];
}