import {MainPane} from "../components/Pane";
import {useTranslation} from "react-i18next";
import TopBar from "../components/TopBar";
import withModel from "../state/model/modelSelector";
import {ModelType} from "../state/model/ModelConfig";

interface HomePageProps {
  model: {[key in ModelType]: any[]};
  table?: ModelType;
}

function HomePage(props: HomePageProps) {
  const [t] = useTranslation('base');

  return <MainPane>
    <TopBar/>
    <div>{t('pages.home.title')}</div>
    {props.table && props.model[props.table].map(entity => [
        <div key={entity['id']}>{entity['username']}</div>,<br key={'br' + entity['id']}/>
    ])}
  </MainPane>
}

export default withModel(HomePage);