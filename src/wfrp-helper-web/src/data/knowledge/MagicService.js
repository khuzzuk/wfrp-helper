import RequestService from "../../connection/RequestService";
import {func} from "prop-types";
import CurrentMagicKnowledge from "./CurrentMagicKnowledge";

export default class MagicService extends RequestService {
    getAvailableSpellSchools(currentMagicKnowledge: CurrentMagicKnowledge, onResponse: func) {
        this.requestFor(currentMagicKnowledge, 'magic/getAvailableSpellSchools', onResponse);
    }
}