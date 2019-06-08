import RequestService from "../../../connection/RequestService";
import {func} from "prop-types";

export default class GearService extends RequestService {
    calculateMeleeDamage(weaponId: number, onResponse: func) {
        this.rawGetRequestFor(`gear/getMeleeWeaponDamage/${weaponId}`, onResponse);
    }
}