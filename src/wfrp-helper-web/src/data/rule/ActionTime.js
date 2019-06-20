import ModelElement from "../../crud/ModelElement";

export const ActionType = {
    ACTION: 'ACTION',
    ROUND: 'ROUND',
    TURN: 'TURN',

    allOf() {
        return [this.ACTION, this.ROUND, this.TURN];
    }
};

export default class ActionTime extends ModelElement {
    actionType: string = ActionType.ACTION;
    amount: number = 1;

    toString(): string {
        switch (this.actionType) {
            case ActionType.ACTION:
                return this.amount;
            case ActionType.ROUND:
                return this.amount + 'r';
            case ActionType.TURN:
                return this.amount + 't';
            default:
                return this.amount;
        }
    }
}