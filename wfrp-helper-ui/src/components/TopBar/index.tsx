import {useTranslation} from "react-i18next";
import Flag from 'react-world-flags';
import {ButtonsWrapper, LanguageIcon, LoadingIndicator, TopBarWrapper} from "./styled";
import withAuthData from "../../state/login/loginSelector";
import User, {ROLE_ADMIN} from "../../model/user";
import Button from "../Button";
import withUiState from "../../state/ui/uiSelector";
import withModel from "../../state/model/modelSelector";
import {ModelType} from "../../state/model/ModelConfig";

export interface TopBarProps {
  user?: User;
  isLoading?: boolean;
  model?: {[key in ModelType]: any[]};
  table?: ModelType;
  getEntities?: (modelType: ModelType) => void;
}

function TopBar(props: TopBarProps) {
  const {t, i18n} = useTranslation('base');

  const onUsers = () => {
    props.getEntities && props.getEntities(ModelType.USER);
  };

  return <TopBarWrapper>
    <ButtonsWrapper>
      {props.user?.authorities?.filter(a => ROLE_ADMIN === a.authority) &&
      <Button onClick={onUsers}>{t('common.users')}</Button>}
    </ButtonsWrapper>
    <LoadingIndicator hide={!props.isLoading}/>
    <LanguageIcon onClick={() => i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl')}>
      <Flag code={i18n.language === 'pl' ? 'pl' : 'gb'}/>
    </LanguageIcon>
  </TopBarWrapper>
}

export default withAuthData(withUiState(withModel(TopBar)));
