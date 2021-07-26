import {BaseEntity} from "../BaseEntity";

export class Skill extends BaseEntity {
    id?: number;
    name: string = '';
    description: string = '';
}