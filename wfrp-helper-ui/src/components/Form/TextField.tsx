import { FieldWrapper, Label, TextFieldStyled } from "./styled";

export interface TextFieldProps {
  onUpdate: (t: string) => void;
  placeholder?: string;
  value?: string;
  label?: string;
}

export default function TextField(props: TextFieldProps) {
  return <FieldWrapper>
    {props.label && <Label>{props.label}</Label>}
    <TextFieldStyled onChange={e => props.onUpdate(e.target.value)}
                     placeholder={props.placeholder || props.label}
                     value={props.value || ''}/>
  </FieldWrapper>
}