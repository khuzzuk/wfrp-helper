import {useState} from "react";
import {useTranslation} from "react-i18next";
import TextField from "components/Form/TextField";
import PasswordField from "components/Form/PasswordField";
import { Form } from "components/Form/styled";
import Button from "components/Button";
import User from "model/user";
import withAuthData from "state/login/loginSelector";
import { WarningLabel } from "components/Label";

function LoginPage(props: {error: boolean, authorize: (user: User) => void}) {
  const [t] = useTranslation('base');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return <>
    <Form>
      {props.error && <WarningLabel>{t('pages.login.warning')}</WarningLabel>}
      <TextField onUpdate={setUsername} placeholder={t('common.username')} value={username}/>
      <PasswordField onUpdate={setPassword} placeholder={t('common.password')} value={password}/>
      <Button onClick={() => props.authorize({username, password, authorities: []})}>{t('common.login')}</Button>
    </Form>
  </>
}

export default withAuthData(LoginPage);
