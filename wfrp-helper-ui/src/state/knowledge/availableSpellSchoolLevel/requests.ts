import axios, {AxiosResponse} from "axios";
import {SpellSchoolLevel} from "model/knowledge/SpellSchoolLevel";
import {BaseEntity} from "model/BaseEntity";
import {Skill} from "model/knowledge/Skill";

export interface AvailableSpellSchoolLevelsRequest {
    currentSpellSchools: SpellSchoolLevel[];
    realm: BaseEntity;
    currentSkills: Skill[];
}

export async function fetchAvailableSpellSchools(request: AvailableSpellSchoolLevelsRequest): Promise<AxiosResponse<SpellSchoolLevel[]>> {
    return await axios.post('magic/getAvailableSpellSchools', request);
}