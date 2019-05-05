import Entity from "../../../crud/Entity";
import Nation from "../nation/Nation";

export default class Currency extends Entity {
    name: string;
    description: string;
    valueMultiplier: number;
    nations: Nation[];
}