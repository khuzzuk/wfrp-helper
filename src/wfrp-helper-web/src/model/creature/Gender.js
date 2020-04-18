import {State} from "../../state/State";

export const Gender = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',

    allOf() {
        return [this.MALE, this.FEMALE];
    },
};

export const GenderEntityName = 'gender';
State.data[GenderEntityName] = Gender.allOf();