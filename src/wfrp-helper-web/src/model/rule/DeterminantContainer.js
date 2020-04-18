import Entity from "../Entity";
import Determinant from "./Determinant";

export default class DeterminantContainer extends Entity {
    determinants: Determinant[] = [];

    updateWith(entity: DeterminantContainer): DeterminantContainer {
        super.updateWith(entity);
        this.updateEntityList(entity, 'determinants', () => new Determinant());
        return this;
    }
}