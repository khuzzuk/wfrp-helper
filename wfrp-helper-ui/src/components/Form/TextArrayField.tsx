import {FieldWrapper} from "./styled";
import {Label, TextAreaStyled} from "./TextArea";

export interface TextArrayFieldProps {
    onUpdate: (t: string[]) => void;
    placeholder?: string;
    value?: string[];
    label?: string;
}

export default function TextArrayField(props: TextArrayFieldProps) {
    const onChange = (v: string) => {
        props.onUpdate(v.replaceAll('\r', '').split('\n'))
    }

    return <FieldWrapper>
        {props.label && <Label>{props.label}</Label>}
        <TextAreaStyled onChange={e => onChange(e.target.value)}
                        placeholder={props.placeholder || props.label}
                        value={props.value?.join('\n') || ''}/>
    </FieldWrapper>
}