import {
    ButtonsWrapper,
    InnerPane,
    LanguageIcon,
    LoadingIndicator,
    MainPaneWrapper,
    PrimaryBar,
    PrimaryBarCell,
    SecondaryBar
} from "./styled";
import User from "model/user";
import ModelConfig, {ModelType} from "model/ModelConfig";
import withAuthData from "state/login/loginSelector";
import withUiState from "state/ui/uiSelector";
import withModel from "state/model/modelSelector";
import {useTranslation} from "react-i18next";
import Flag from "react-world-flags";
import {useState} from "react";

const buttons: ModelType[] = [
    ModelType.USER,
    ModelType.SKILL,
];

export interface MainPaneProps {
    children: JSX.Element[],
    user?: User;
    isLoading?: boolean;
    model?: { [key in ModelType]: any[] };
    table?: ModelType;
    getEntities?: (modelType: ModelType) => void;
}

function MainPane(props: MainPaneProps) {
    const {t, i18n} = useTranslation('base');

    const [selectedOption, setSelectedOption] = useState<string>();

    const onModel = (modelType: ModelType) => {
        setSelectedOption(modelType)
        props.getEntities && props.getEntities(modelType);
    };

    return <MainPaneWrapper>
        <PrimaryBar>
            {buttons.filter(modelType => props.user?.authorities
                .filter(a => a.authority === 'ROLE_' + ModelConfig[modelType].name.toUpperCase()))
                .map(modelType =>
                    <PrimaryBarCell selected={selectedOption === modelType} onClick={() => onModel(modelType)}>
                        {t('common.' + ModelConfig[modelType].name)}
                    </PrimaryBarCell>
                )}
        </PrimaryBar>
        <InnerPane>
            <SecondaryBar>
                <ButtonsWrapper></ButtonsWrapper>
                <LoadingIndicator hide={!props.isLoading}/>
                <LanguageIcon onClick={() => i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl')}>
                    <Flag code={i18n.language === 'pl' ? 'pl' : 'gb'}/>
                </LanguageIcon>
            </SecondaryBar>
            {props.children}
        </InnerPane>
    </MainPaneWrapper>
}

export default withAuthData(withUiState(withModel(MainPane)));
