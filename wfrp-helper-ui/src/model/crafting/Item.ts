import {DescribedEntity} from "../DescribedEntity";
import DeterminantEntity from "../rule/DeterminantEntity";
import {Determinant} from "../rule/Determinant";

export class Item extends DescribedEntity implements DeterminantEntity{
    determinants: Determinant[] = [];
}