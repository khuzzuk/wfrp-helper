import styled from "styled-components";
import {TextFieldProps} from "./index";

export const TextFieldStyled = styled.input`
  color: ${props => props.theme.colors.text.main};
  background: ${props => props.theme.colors.primary.main};
  
  border: 2px solid ${props => props.theme.colors.secondary.light};
  border-radius: 0.5em;
  
  font-size: 2em;
  line-height: 3em;
  padding: 0 1em;
`;

export default function TextField(props: TextFieldProps) {
  return <TextFieldStyled onChange={e => props.onUpdate(e.target.value)}/>
}