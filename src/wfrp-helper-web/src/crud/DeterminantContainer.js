import Entity from "./Entity";
import Determinant from "../data/rule/Determinant";

export default class DeterminantContainer extends Entity {
    determinants: Determinant[] = [];


    updateWith(entity: DeterminantContainer) {
        super.updateWith(entity);
        this.updateEntityList(entity, 'determinants', () => new Determinant());
    }
}