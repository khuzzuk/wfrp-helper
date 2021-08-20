import {FieldWrapper, Label} from "./styled";
import {useTranslation} from "react-i18next";
import ComboBox from "./ComboBox";
import TextField, {InputType} from "./TextField";
import {ActionType} from "model/rule/ActionType";

export interface ActionTimeFieldProps {
    label: string;
    value: any;
    upd: (v: any) => void;
}

function ActionTimeField(props: ActionTimeFieldProps) {
    const [t] = useTranslation('base');

    const updType = (type: ActionType) => {
        props.upd({...props.value, type});
    }
    const updAmount = (amount: number) => {
        props.upd({...props.value, amount});
    }

    const val = props.value || {type: ActionType.ACTION, amount: 1}

    return <FieldWrapper>
        <Label>{t('props.' + props.label)}</Label>
        <ComboBox value={val['type']} data={Object.keys(ActionType)} label={'actionType'} accept={updType} enum/>
        <TextField onUpdate={updAmount} value={val.amount} type={InputType.INT} label={'amount'}/>
    </FieldWrapper>
}

export default ActionTimeField;