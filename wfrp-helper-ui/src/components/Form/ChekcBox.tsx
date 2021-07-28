import styled from "styled-components";
import { FieldWrapper } from "./styled";

export const CheckBoxStyled = styled.input`
  color: ${props => props.theme.colors.text.main};
  background: ${props => props.theme.colors.primary.main};
  
  border: 2px solid ${props => props.theme.colors.secondary.light};
  border-radius: 0.5em;
  
  font-size: 2em;
  line-height: 3em;
  padding: 0 1em;
`;

export const Label = styled.div`
  font-size: 2em;
  line-height: 2.5em;
  font-weight: bolder;
`;

export interface TextFieldProps {
  onUpdate: (t: boolean) => void;
  placeholder?: string;
  value?: boolean;
  label?: string;
}

export default function ChekcBox(props: TextFieldProps) {
  return <FieldWrapper>
    {props.label && <Label>{props.label}</Label>}
    <CheckBoxStyled type={'checkbox'}
                    value={props.value ? 'true' : 'false'}
                    onChange={e => props.onUpdate(e.target.value === 'true')}/>
  </FieldWrapper>
}