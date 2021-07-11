import Flag from 'react-world-flags';
import {ButtonsWrapper, LanguageIcon, TopBarWrapper } from "./styled";
import {useTranslation} from "react-i18next";
import withAuthData from "../../state/login/loginSelector";
import User, {ROLE_ADMIN} from "../../model/user";
import Button from "../Button";

function TopBar({user}: {user: User | undefined}) {
  const {t, i18n} = useTranslation('base');

  return <TopBarWrapper>
    <ButtonsWrapper>
      {user?.authorities?.filter(a => ROLE_ADMIN === a.authority) && <Button>{t('common.users')}</Button>}
    </ButtonsWrapper>
    <LanguageIcon onClick={() => i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl')}>
      <Flag code={i18n.language === 'pl' ? 'pl' : 'gb'}/>
    </LanguageIcon>
  </TopBarWrapper>
}

export default withAuthData(TopBar);