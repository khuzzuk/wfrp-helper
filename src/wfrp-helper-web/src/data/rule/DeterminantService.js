import RequestService from "../../connection/RequestService";
import Determinant from "./Determinant";
import Modifier from "./Modifier";
import {func} from "prop-types";

export default class DeterminantService extends RequestService {
    addExperienceExtension(determinant: Determinant, onAdded: func) {
        this.requestFor(determinant, 'determinant/addExperienceExtension',
            data => DeterminantService.afterReponse(data, onAdded));
    }

    removeExperienceExtension(determinant: Determinant, onRemoved) {
        this.requestFor(determinant, 'determinant/removeExperienceExtension',
            data => DeterminantService.afterReponse(data, onRemoved));
    }

    static afterReponse(data, afterUpdate) {
        const newDeterminant = new Determinant();
        newDeterminant.updateWith(data);
        afterUpdate(newDeterminant);
    }

    static findDeterminantIn(determinants: Determinant[], type: string) {
        return determinants.find(determinant => type === determinant.type)
    }

    static removeModifiersByType(modifiers: Modifier[], type: string): Modifier[] {
        let mod = DeterminantService.findModifierByType(modifiers, type);
        while (mod) {
            modifiers.splice(modifiers.indexOf(mod), 1)
            mod = DeterminantService.findModifierByType(modifiers, type);
        }
        return modifiers;
    }

    static findModifierByType(modifiers: Modifier[], type: string): Modifier {
        return modifiers.find(value => value.type === type);
    }

    static sumValueByTypeIn(determinants: Determinant[], type: string): number {
        return determinants.filter(det => type === det.type)
            .reduce((a, b) => a + b.calculateFinalValue(), 0)
    }
}