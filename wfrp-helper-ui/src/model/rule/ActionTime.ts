import {ActionType} from "./ActionType";

export class ActionTime {
    type: ActionType = ActionType.ACTION;
    amount: number = 1;

    static toUi(actionTime: ActionTime): string {
        switch (actionTime.type) {
            case ActionType.ACTION:
                return 'A' + actionTime.amount;
            case ActionType.ROUND:
                return 'R' + actionTime.amount;
            case ActionType.TURN:
                return 'T' + actionTime.amount;
            default:
                return 'U' + actionTime.amount;
        }
    }
}