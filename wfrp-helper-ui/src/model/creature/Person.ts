import { BaseEntity } from "model/BaseEntity";
import {Determinant} from "../rule/Determinant";

export interface Person extends BaseEntity {
  race: BaseEntity;
  determinants: Determinant[];
}