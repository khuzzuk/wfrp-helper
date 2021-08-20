import {
    ButtonsWrapper,
    InnerPane,
    LanguageIcon,
    LoadingIndicator,
    MainPaneWrapper,
    PrimaryBar,
    PrimaryBarCell,
    SecondaryBar,
    SecondaryButton
} from "./styled";
import {MdAdd, MdArrowBack, MdCheck, MdDelete, MdModeEdit, MdSave} from "react-icons/md";
import User from "model/user";
import ModelConfig, {ModelType} from "model/ModelConfig";
import withAuthData from "state/login/loginSelector";
import withUiState from "state/ui/uiSelector";
import withModel from "state/model/modelSelector";
import {useTranslation} from "react-i18next";
import Flag from "react-world-flags";
import {useState} from "react";

const groups = {
    admin: [
        ModelType.USER,
    ],
    knowledge: [
        ModelType.SKILL,
        ModelType.PROFESSION_CLASS,
        ModelType.PROFESSION,
        ModelType.SPELL_SCHOOL,
        ModelType.SPELL,
    ],
    world: [
        ModelType.NATION,
        ModelType.LANGUAGE,
        ModelType.CURRENCY,
        ModelType.RELIGION,
        ModelType.RACE,
        ModelType.PLACE,
    ],
    crafting: [
        ModelType.RESOURCE,
        ModelType.ARMOR_PATTERN,
        ModelType.MISC_ITEM,
        ModelType.JEWELRY,
        ModelType.ARMOR,
    ],
    blueprint: [
        ModelType.ARMOR_BLUEPRINT,
        ModelType.MELEE_WEAPON_BLUEPRINT,
        ModelType.RANGED_WEAPON_BLUEPRINT,
    ]
}

export interface MainPaneProps {
    children: JSX.Element[],
    user?: User;
    isLoading?: boolean;
    model?: { [key in ModelType]: any[] };
    table?: ModelType;
    form?: ModelType;
    entity?: any;
    getEntities?: (modelType: ModelType) => void;
    createEntity: () => void;
    startEdit: () => void;
    deleteEntity: () => void;
    applyEdit: () => void;
    saveEdit: () => void;
}

function MainPane(props: MainPaneProps) {
    const {t, i18n} = useTranslation('base');

    const [selectedOption, setSelectedOption] = useState<string>();
    const [selectedGroup, setSelectedGroup] = useState('');

    const onModel = (modelType: ModelType) => {
        setSelectedOption(modelType)
        props.getEntities && props.getEntities(modelType);
    };

    const showAddButton: boolean = !!props.table;
    const showEditButton: boolean = props.entity && props.table;
    const showApplyButton: boolean = props.entity && props.form;

    return <MainPaneWrapper>
        <PrimaryBar>
            {!selectedGroup && Object.keys(groups).map(group => <PrimaryBarCell selected={group === selectedGroup}
                                                                                onClick={() => setSelectedGroup(group)}>
                {t('props.' + group)}
            </PrimaryBarCell>)}
            {selectedGroup && <PrimaryBarCell selected={false} onClick={() => setSelectedGroup('')}><MdArrowBack/></PrimaryBarCell>}
            {selectedGroup && ((groups as any)[selectedGroup] as ModelType[]).filter(modelType => props.user?.authorities
                .filter(a => a.authority === 'ROLE_' + ModelConfig[modelType].name.toUpperCase()))
                .map(modelType =>
                    <PrimaryBarCell key={modelType}
                                    selected={selectedOption === modelType}
                                    onClick={() => onModel(modelType)}>
                        {t('model.' + ModelConfig[modelType].name)}
                    </PrimaryBarCell>
                )}
        </PrimaryBar>
        <InnerPane>
            <SecondaryBar>
                <ButtonsWrapper>
                    {showAddButton &&
                    <SecondaryButton onClick={props.createEntity}><MdAdd/>{t('common.add')}</SecondaryButton>
                    }
                    {showEditButton &&
                    <SecondaryButton onClick={props.startEdit}><MdModeEdit/>{t('common.edit')}</SecondaryButton>
                    }
                    {showEditButton &&
                    <SecondaryButton onClick={props.deleteEntity}><MdDelete/>{t('common.delete')}</SecondaryButton>
                    }
                    {showApplyButton &&
                    <SecondaryButton onClick={props.applyEdit}><MdCheck/>{t('common.apply')}</SecondaryButton>
                    }
                    {showApplyButton &&
                    <SecondaryButton onClick={props.saveEdit}><MdSave/>{t('common.save')}</SecondaryButton>
                    }
                </ButtonsWrapper>
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
