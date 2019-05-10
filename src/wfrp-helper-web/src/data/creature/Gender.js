export const Gender = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',

    allOf() {
        return [this.MALE, this.FEMALE];
    },
};