import {DescribedEntity} from "../DescribedEntity";
import DeterminantEntity from "../rule/DeterminantEntity";
import {Determinant} from "../rule/Determinant";
import {Skill} from "./Skill";

export class Profession extends DescribedEntity implements DeterminantEntity {
    determinants: Determinant[] = [];
    nextProfessions: string[] = [];
    skills: Skill[] = [];
}