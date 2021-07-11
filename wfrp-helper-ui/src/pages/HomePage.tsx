import Button from "../components/Button";
import {MainPane} from "../components/Pane";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {LOGIN} from "../navigation/RoutingProvider";
import User from "../model/user";
import withAuthData from "../state/login/loginSelector";
import TopBar from "../components/TopBar";

interface HomePageProps {
  user: User | undefined;
}

function HomePage(props: HomePageProps) {
  const [t] = useTranslation('base');

  return <MainPane>
    <TopBar/>
    <div>{t('pages.home.title')}</div>
    {!props.user &&
    <Link to={LOGIN}>
      <Button>{t('common.login')}</Button>
    </Link>
    }
  </MainPane>
}

export default withAuthData(HomePage)