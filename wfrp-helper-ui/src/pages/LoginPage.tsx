import { MainPane } from "../components/Pane";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import TextField from "../components/Form/TextField";
import PasswordField from "../components/Form/PasswordField";
import { Form } from "../components/Form/Form";
import Button from "../components/Button";
import User from "../model/user";
import withAuthData from "../state/login/loginSelector";
import { WarningLabel } from "../components/Label";
import TopBar from "../components/TopBar";

function LoginPage(props: {error: boolean, authorize: (user: User) => void}) {
  const [t] = useTranslation('base');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return <MainPane>
    <TopBar/>
    <Form>
      {props.error && <WarningLabel>{t('pages.login.warning')}</WarningLabel>}
      <TextField onUpdate={setUsername} placeholder={t('common.username')} value={username}/>
      <PasswordField onUpdate={setPassword} placeholder={t('common.password')} value={password}/>
    </Form>
    <Button onClick={() => props.authorize({username, password, authorities: []})}>{t('common.login')}</Button>
  </MainPane>
}

export default withAuthData(LoginPage);
