import {BaseEntity} from "../BaseEntity";
import {Determinant} from "./Determinant";

export default interface DeterminantEntity extends BaseEntity {
    determinants: Determinant[];
}