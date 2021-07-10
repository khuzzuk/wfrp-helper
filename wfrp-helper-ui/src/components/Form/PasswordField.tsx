import {TextFieldProps} from "./index";
import {TextFieldStyled} from "./TextField";

export default function PasswordField(props: TextFieldProps) {
  return <TextFieldStyled type={'password'} onChange={e => props.onUpdate(e.target.value)}/>
}