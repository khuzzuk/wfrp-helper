import {ChangeEvent} from "react";
import {FieldWrapper, Label, TextFieldStyled} from "./styled";

export enum InputType {
    TEXT = 'TEXT',
    INT = 'INT',
    FLOAT = 'FLOAT',
}

export interface TextFieldProps {
    onUpdate: (t: any) => void;
    placeholder?: string;
    value?: string;
    label?: string;
    type?: InputType;
}

export default function TextField(props: TextFieldProps) {
    let onUpdate;
    switch (props.type){
        case InputType.INT:
            onUpdate = (e: ChangeEvent<HTMLInputElement>) => {
                const val = parseInt(e.target.value);
                if (val || val === 0) {
                    props.onUpdate(val);
                }
            }
            break;
        case InputType.FLOAT:
            onUpdate = (e: ChangeEvent<HTMLInputElement>) => {
                let v = e.target.value;
                const num = parseFloat(v.replace(',', '.'));
                if (num || num === 0) {
                    props.onUpdate(v.endsWith('.') || v.endsWith(',') ? num + '.' : num);
                }
            }
            break;
        default:
            onUpdate = (e: ChangeEvent<HTMLInputElement>) => props.onUpdate(e.target.value);
            break;
    }

    return <FieldWrapper>
        {props.label && <Label>{props.label}</Label>}
        <TextFieldStyled onChange={onUpdate} placeholder={props.placeholder || props.label} value={props.value || ''}/>
    </FieldWrapper>
}