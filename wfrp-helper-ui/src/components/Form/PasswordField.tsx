import { FieldWrapper, TextFieldStyled } from "./styled";
import {TextFieldProps} from "./TextField";

export default function PasswordField(props: TextFieldProps) {
  return <FieldWrapper><TextFieldStyled type={'password'} onChange={e => props.onUpdate(e.target.value)}/></FieldWrapper>
}