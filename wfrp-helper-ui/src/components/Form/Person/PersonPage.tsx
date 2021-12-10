import withModel from "state/model/modelSelector";
import {
    AgeBox,
    ArmorSelectBox,
    ArmorStatsBox,
    CareerBox,
    CharacterBox,
    ClassBox,
    ContextMenu,
    EyesBox,
    GenderBox,
    HairBox,
    HeightBox,
    Label,
    MeleeWeaponBox,
    NameBox,
    NextProfessionsBox,
    PersonColumn1,
    PersonColumn2,
    PersonPane,
    ProfessionBox,
    RaceBox,
    RangeWeaponBox,
    SkillFirstBox,
    SkillSecondBox,
    SpecialFeaturesBox,
    SpecialFeaturesList,
    SpecialFeaturesSelect,
    StatsBox, StatsGenerateBox,
    WeightBox
} from "./style";
import {ChangeEvent, useState} from "react";
import {ModelType} from "model/ModelConfig";
import {getOption, toOptions} from "./SelectUtils";
import {MdClose} from "react-icons/md";
import {BaseEntity} from "model/BaseEntity";
import {DescribedEntity} from "model/DescribedEntity";
import Button from "components/Button";
import withPerson from "state/person/personSelector";
import {useTranslation} from "react-i18next";

interface PersonPageProps {
    entity: any;
    model: { [key in ModelType]: any[] };
    updateEntityProp: (val: any, propName: string) => void;
    generateNewStats: () => void;
}

function PersonPage({entity, model, updateEntityProp, generateNewStats}: PersonPageProps) {
    const [t] = useTranslation('base');
    const [showStatsGenerationMenu, setShowStatsGenerationMenu] = useState(false);

    const updateStringProp = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        updateEntityProp(event.target.value, prop);
    }
    const updateIntProp = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length === 0) {
            updateEntityProp(value, prop);
        }
        const intValue = parseInt(value);
        if (intValue) {
            updateEntityProp(intValue, prop);
        }
    }
    const updateFloatProp = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length === 0) {
            updateEntityProp(value, prop);
        }
        const intValue = parseFloat(value);
        if (intValue) {
            updateEntityProp(intValue, prop);
        }
    }
    const selectEntity = (prop: string, values: any[]) => (event: ChangeEvent<HTMLSelectElement>) => {
        updateEntityProp(getOption(parseInt(event.target.value), values), prop);
    }
    const selectEnum = (prop: string) => (event: ChangeEvent<HTMLSelectElement>) => {
        updateEntityProp(event.target.value, prop);
    }
    const selectMultiEntity = (prop: string, values: any[]) => (event: ChangeEvent<HTMLSelectElement>) => {
        const option = getOption(parseInt(event.target.value), values);
        const newValue = entity[prop] ? [...entity[prop], option] : [option];
        updateEntityProp(newValue, prop);
    }
    const removeFromMultiEntity = (prop: string, toDelete: BaseEntity) => {
        updateEntityProp(entity[prop].filter((e: BaseEntity) => e.id !== toDelete.id), prop);
    }
    const selectProfession = (values: DescribedEntity[]) => (event: ChangeEvent<HTMLSelectElement>) => {
        const profession = getOption(parseInt(event.target.value), values);
        updateEntityProp(profession, 'currentProfession');
        updateEntityProp([...(entity['professions'] || []), profession], 'professions');
    }

    return <PersonPane>
        <PersonColumn1>
            <NameBox onChange={updateStringProp('name')} value={entity.name}/>
            <RaceBox onChange={selectEntity('race', model.RACE)}
                     value={entity.race ? entity.race.id : 'empty'}>
                {toOptions(model.RACE)}
            </RaceBox>
            <GenderBox onChange={selectEnum('gender')}
                       value={entity.gender || 'empty'}>
                <option value={'MALE'}>M</option>
                <option value={'FEMALE'}>K</option>
            </GenderBox>
            <ClassBox onChange={selectEntity('professionClass', model.PROFESSION_CLASS)}
                      value={entity.professionClass ? entity.professionClass.id : 'empty'}>
                {toOptions(model.PROFESSION_CLASS)}
            </ClassBox>
            <CharacterBox onChange={selectEntity('character', model.CHARACTER)}
                          value={entity.character ? entity.character.id : 'empty'}>
                {toOptions(model.CHARACTER)}
            </CharacterBox>

            <AgeBox onChange={updateIntProp('age')} value={entity['age']}/>
            <HeightBox onChange={updateIntProp('height')} value={entity.height}/>
            <WeightBox onChange={updateFloatProp('weight')} value={entity.weight}/>
            <HairBox onChange={selectEntity('hairColor', model.HAIR_COLOR)}
                     value={entity.hairColor ? entity.hairColor.id : 'empty'}>
                {toOptions(model.HAIR_COLOR)}
            </HairBox>
            <EyesBox onChange={selectEntity('eyeColor', model.EYE_COLOR)}
                     value={entity.eyeColor ? entity.eyeColor.id : 'empty'}>
                {toOptions(model.EYE_COLOR)}
            </EyesBox>
            <SpecialFeaturesBox>
                <SpecialFeaturesList>
                    <SpecialFeaturesSelect onChange={selectMultiEntity('physicalFeatures', model.PHYSICAL_FEATURE)} value={'empty'}>
                        <option disabled hidden value={'empty'}/>
                        {toOptions(model.PHYSICAL_FEATURE, entity.physicalFeatures)}
                    </SpecialFeaturesSelect>
                    {entity.physicalFeatures && entity.physicalFeatures.map((feat: DescribedEntity) =>
                        <Label key={feat.id}>{feat.name}<MdClose onClick={() => removeFromMultiEntity('physicalFeatures', feat)}/></Label>)}
                </SpecialFeaturesList>
            </SpecialFeaturesBox>

            <ProfessionBox onChange={selectProfession(model.PROFESSION)}
                           value={entity.currentProfession ? entity.currentProfession.id : 'empty'}>
                {toOptions(model.PROFESSION)}
            </ProfessionBox>
            <CareerBox>{entity.professions && entity.professions.map((prof: DescribedEntity) =>
                <Label key={prof.id}>{prof.name},</Label>)}
            </CareerBox>
            <NextProfessionsBox>{entity.currentProfession?.nextProfessions && entity.currentProfession.nextProfessions.map((nextProfession: string) =>
                <span>{nextProfession}</span>
            )}</NextProfessionsBox>
            <StatsBox>
                <StatsGenerateBox onClick={() => setShowStatsGenerationMenu(!showStatsGenerationMenu)}>
                    <ContextMenu display={showStatsGenerationMenu}>
                        <Button onClick={generateNewStats}>{t('common.generate')}</Button>
                    </ContextMenu>
                </StatsGenerateBox>
            </StatsBox>
            <MeleeWeaponBox></MeleeWeaponBox>
            <RangeWeaponBox></RangeWeaponBox>
            <ArmorSelectBox></ArmorSelectBox>
            <ArmorStatsBox></ArmorStatsBox>
            <SkillFirstBox></SkillFirstBox>
            <SkillSecondBox></SkillSecondBox>
        </PersonColumn1>


        <PersonColumn2>

        </PersonColumn2>
    </PersonPane>
}

export default withPerson(withModel(PersonPage));