import RequestService from "../../connection/RequestService";
import Determinant from "./Determinant";

export default class DeterminantService extends RequestService {
    addExperienceExtension(determinant: Determinant) {
        const newDeterminant = this.requestFor(determinant, 'determinant/addExperienceExtension');
        return newDeterminant;
    }
}