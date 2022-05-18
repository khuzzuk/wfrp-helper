import {DescribedEntity} from "model/DescribedEntity";
import DeterminantEntity from "model/rule/DeterminantEntity";
import {Determinant} from "model/rule/Determinant";

export class Ammunition extends DescribedEntity implements DeterminantEntity {
    determinants: Determinant[] = [];
}