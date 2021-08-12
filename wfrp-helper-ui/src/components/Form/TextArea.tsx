import styled from "styled-components";
import {FieldWrapper} from "./styled";
import {TextFieldProps} from "./TextField";

export const TextAreaStyled = styled.textarea`
  color: ${props => props.theme.colors.text.main};
  background: ${props => props.theme.colors.primary.main};

  border: 2px solid ${props => props.theme.colors.secondary.light};
  border-radius: 0.5em;

  font-size: 1em;
  line-height: 1.25em;
  padding: 0 1em;
  height: 10vh;
  width: 100%;
`;

export const Label = styled.div`
  font-size: 1.25em;
  line-height: 1.5em;
  font-weight: bolder;
`;

export default function TextArea(props: TextFieldProps) {
    return <FieldWrapper>
        {props.label && <Label>{props.label}</Label>}
        <TextAreaStyled onChange={e => props.onUpdate(e.target.value)}
                        placeholder={props.placeholder || props.label}
                        value={props.value || ''}/>
    </FieldWrapper>
}