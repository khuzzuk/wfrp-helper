import {useTranslation} from "react-i18next";
import {FieldRowWrapper, FieldWrapper, Label} from "./styled";
import TextField, {InputType} from "./TextField";

export interface PriceFieldProps {
    label: string;
    value: any;
    upd: (v: any) => void;
}

export default function PriceField(props: PriceFieldProps) {
    const [t] = useTranslation('base');

    const updGold = (gold: number) => {
        props.upd({...props.value, gold})
    }
    const updSilver = (silver: number) => {
        props.upd({...props.value, silver})
    }
    const updLead = (lead: number) => {
        props.upd({...props.value, lead})
    }

    const price = props.value || {gold: 0, silver: 0, lead: 0}

    return <FieldWrapper>
        <Label>{t('props.' + props.label)}</Label>
        <FieldRowWrapper>
            <TextField onUpdate={updGold} value={price.gold} type={InputType.INT} label={'gold'}/>
            <TextField onUpdate={updSilver} value={price.silver} type={InputType.INT} label={'silver'}/>
            <TextField onUpdate={updLead} value={price.lead} type={InputType.INT} label={'lead'}/>
        </FieldRowWrapper>
    </FieldWrapper>
}
