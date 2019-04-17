export const ActionType = {
    ACTION: 'ACTION',
    ROUND: 'ROUND',
    TURN: 'TURN',

    allOf() {
        return [this.ACTION, this.ROUND, this.TURN];
    }
};

export default class ActionTime {
    actionType: string = ActionType.ACTION;
    amount: number = 1;
}