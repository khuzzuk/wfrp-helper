import withModel from "state/model/modelSelector";
import {
    AgeBox,
    AmmunitionItem,
    ArmorSelectBox,
    ArmorItem,
    ArmorStatsBox,
    CareerBox,
    CharacterBox,
    ClassBox,
    ContextMenu,
    EyesBox,
    GenderBox,
    HairBox,
    HeadStat,
    HeightBox,
    Input,
    ItemStat,
    Label,
    MeleeWeaponBox,
    MeleeWeaponItem,
    NameBox,
    NextProfessionsBox,
    PersonColumn1,
    PersonColumn2,
    PersonPane,
    ProfessionBox,
    RaceBox,
    RangedWeaponItem,
    RangeWeaponBox,
    RemoveIcon,
    SelectItemBox,
    ShieldStat,
    SkillFirstBox,
    SkillSecondBox,
    SpecialFeaturesBox,
    SpecialFeaturesList,
    SpecialFeaturesSelect,
    Stat,
    StatsBox,
    StatsGenerateBox,
    StatsInnerBox,
    StatsRow,
    WeightBox,
    RightHandStat,
    RightLegStat,
    LeftHandStat,
    TorsoStat,
    LeftLegStat, SkillItem,
} from "./style";
import {ChangeEvent, useEffect, useState} from "react";
import {ModelType} from "model/ModelConfig";
import {getOption, toOptions} from "./SelectUtils";
import {BaseEntity} from "model/BaseEntity";
import {DescribedEntity} from "model/DescribedEntity";
import Button from "components/Button";
import withPerson from "state/person/personSelector";
import {useTranslation} from "react-i18next";
import {creatureDeterminants, DeterminantType} from "model/rule/DeterminantType";
import {DeterminantService} from "utils/DeterminantService";
import {Person} from "model/creature/Person";
import {PersonalRangedWeapon, RangedWeapon} from "model/crafting/RangedWeapon";
import {ActionTime} from "model/rule/ActionTime";
import {Ammunition} from "model/crafting/Ammunition";
import withGear from "../../../state/gear/gearSelector";
import {Placement} from "../../../model/crafting/Placement";

interface PersonPageProps {
    entity: Person;
    model: { [key in ModelType]: any[] };
    updateEntityProp: (val: any, propName: string) => void;
    generateNewStats: () => void;
    tryAddExtension: (type: DeterminantType) => void;
    tryRemoveExtension: (type: DeterminantType) => void;
    armorStats: { [key in Placement]?: number };
    getArmorStats: (ids: number[]) => void;
}

function PersonPage({
                        entity,
                        model,
                        updateEntityProp,
                        generateNewStats,
                        tryAddExtension,
                        tryRemoveExtension,
                        armorStats,
                        getArmorStats
                    }: PersonPageProps) {

    const [t] = useTranslation('base');
    const [showStatsGenerationMenu, setShowStatsGenerationMenu] = useState(false);

    useEffect(() => {
        console.log(entity.armor);
        getArmorStats(entity.armor.map(a => a.id || 0));
    }, [entity.armor.length, getArmorStats])

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
        const newValue = (entity as any)[prop] ? [...(entity as any)[prop], option] : [option];
        updateEntityProp(newValue, prop);
    }
    const removeFromMultiEntity = (prop: string, toDelete: BaseEntity) => () => {
        updateEntityProp((entity as any)[prop].filter((e: BaseEntity) => e.id !== toDelete.id), prop);
    }
    const selectProfession = (values: DescribedEntity[]) => (event: ChangeEvent<HTMLSelectElement>) => {
        const profession = getOption(parseInt(event.target.value), values);
        updateEntityProp(profession, 'currentProfession');
        updateEntityProp([...(entity['professions'] || []), profession], 'professions');
    }
    const statExtAdd = (type: DeterminantType) => () => {
        tryAddExtension(type);
    }
    const statExtRemove = (type: DeterminantType) => (e: any) => {
        e.preventDefault();
        tryRemoveExtension(type);
    }

    //RangedWeapon
    const selectRangedWeapon = (event: ChangeEvent<HTMLSelectElement>) => {
        const option: RangedWeapon = getOption(parseInt(event.target.value), model.RANGED_WEAPON);
        const newValue: PersonalRangedWeapon[] = [...entity.rangedWeapons, { rangedWeapon: option} as PersonalRangedWeapon];
        updateEntityProp(newValue, 'rangedWeapons');
    }
    const addAmmunition = (entry: PersonalRangedWeapon) => (event: ChangeEvent<HTMLSelectElement>) => {
        const option: Ammunition = getOption(parseInt(event.target.value), model.AMMUNITION);
        const newEntry: PersonalRangedWeapon = {...entry, ammunition: option};
        const newValue: PersonalRangedWeapon[] = [...entity.rangedWeapons.filter(w => w !== entry), newEntry];
        updateEntityProp(newValue, 'rangedWeapons');
    };
    const updateAmmunitionAmount = (entry: PersonalRangedWeapon) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const amount = value.length === 0 ? 0 : parseInt(value);
        const newEntry: PersonalRangedWeapon = {...entry, ammunitionAmount: amount};
        const newValue: PersonalRangedWeapon[] = [...entity.rangedWeapons.filter(w => w !== entry), newEntry];
        updateEntityProp(newValue, 'rangedWeapons');
    }
    const removeRangedWeapon = (entry: PersonalRangedWeapon) => () => {
        updateEntityProp(entity.rangedWeapons.filter(w => w !== entry), 'rangedWeapons');
    }
    const removeAmmunition = (entry: PersonalRangedWeapon) => () => {
        const newEntry: PersonalRangedWeapon = {...entry, ammunition: undefined, ammunitionAmount: 0};
        const newValue: PersonalRangedWeapon[] = [...entity.rangedWeapons.filter(w => w !== entry), newEntry];
        updateEntityProp(newValue, 'rangedWeapons');
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
            <CharacterBox onChange={selectEntity('personality', model.CHARACTER)}
                          value={entity.personality ? entity.personality.id : 'empty'}>
                {toOptions(model.CHARACTER)}
            </CharacterBox>

            <AgeBox onChange={updateIntProp('age')} value={entity.age}/>
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
                    {entity.physicalFeatures.map((feat: DescribedEntity) =>
                        <Label key={feat.id}>{feat.name}<RemoveIcon onClick={removeFromMultiEntity('physicalFeatures', feat)}/></Label>)}
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
                    <ContextMenu show={showStatsGenerationMenu}>
                        <Button small onClick={generateNewStats}>{t('common.generate')}</Button>
                    </ContextMenu>
                </StatsGenerateBox>

                <StatsInnerBox>
                    <StatsRow>
                        {creatureDeterminants.map(determinantType => <Stat key={determinantType}>
                            {DeterminantService.findByType(entity.determinants.determinants, determinantType)?.value || 0}
                        </Stat>)}
                    </StatsRow>
                    <StatsRow>
                        {creatureDeterminants.map(determinantType => <Stat key={determinantType}
                                                                           onClick={statExtAdd(determinantType)}
                                                                           onContextMenu={statExtRemove(determinantType)}>
                            {entity.currentProfession &&
                            DeterminantService.getProfessionExtensions(entity.currentProfession.determinants, determinantType)}
                        </Stat>)}
                    </StatsRow>
                    <StatsRow>
                        {creatureDeterminants.map(determinantType => <Stat key={determinantType}>
                            {DeterminantService.getTotalValue(
                                DeterminantService.findByType(entity.determinants.determinants, determinantType))}
                        </Stat>)}
                    </StatsRow>
                </StatsInnerBox>
            </StatsBox>

            <MeleeWeaponBox>
                <SelectItemBox value={'empty'} onChange={selectMultiEntity('meleeWeapons', model.MELEE_WEAPON)}>
                    <option disabled hidden value={'empty'}/>
                    {toOptions(model.MELEE_WEAPON, entity.meleeWeapons)}
                </SelectItemBox>
                {entity.meleeWeapons.map(w => <MeleeWeaponItem key={w.name}>
                    <div>{w.name}</div>
                    <ItemStat>{DeterminantService.toUi(w.determinants, DeterminantType.INITIATIVE)}</ItemStat>
                    <ItemStat>{DeterminantService.toUi(w.determinants, DeterminantType.BATTLE)}</ItemStat>
                    <ItemStat>{DeterminantService.toUi(w.determinants, DeterminantType.STRENGTH)}</ItemStat>
                    <ItemStat>{DeterminantService.toUi(w.determinants, DeterminantType.PARRY)}</ItemStat>
                </MeleeWeaponItem>)}
            </MeleeWeaponBox>

            <RangeWeaponBox>
                <SelectItemBox value={'empty'} onChange={selectRangedWeapon}>
                    <option disabled hidden value={'empty'}/>
                    {toOptions(model.RANGED_WEAPON, entity.rangedWeapons)}
                </SelectItemBox>
                {entity.rangedWeapons.map(w => <>
                    <RangedWeaponItem key={w.rangedWeapon.name + w.uuid}>
                        <div>{w.rangedWeapon.name}</div>
                        <RemoveIcon onClick={removeRangedWeapon(w)}/>
                        <ItemStat>{w.rangedWeapon.type.minimumRange}</ItemStat>
                        <ItemStat>{w.rangedWeapon.type.minimumRange}</ItemStat>
                        <ItemStat>{w.rangedWeapon.type.minimumRange}</ItemStat>
                        <ItemStat>{DeterminantService.toUi(w.rangedWeapon.determinants, DeterminantType.STRENGTH)}</ItemStat>
                        <ItemStat>{ActionTime.toUi(w.rangedWeapon.type.prepareTime)}</ItemStat>
                    </RangedWeaponItem>
                    <AmmunitionItem>
                        <SelectItemBox value={w.ammunition?.id || 'empty'} onChange={addAmmunition(w)}>
                            {toOptions(model.AMMUNITION)}
                        </SelectItemBox>
                        {w.ammunition && <>
                            <RemoveIcon onClick={removeAmmunition(w)}/>
                            <Input onChange={updateAmmunitionAmount(w)}/>
                            <ItemStat>
                                {DeterminantService.toUi(w.ammunition.determinants, DeterminantType.STRENGTH)}
                            </ItemStat>
                        </>
                        }
                    </AmmunitionItem>
                </>)}
            </RangeWeaponBox>

            <ArmorSelectBox>
                <SelectItemBox value={'empty'} onChange={selectMultiEntity('armor', model.ARMOR)}>
                    <option disabled hidden value={'empty'}/>
                    {toOptions(model.ARMOR, entity.armor)}
                </SelectItemBox>
                {entity.armor.map(armor => <ArmorItem key={armor.name}>
                    {armor.name}
                    <RemoveIcon onClick={removeFromMultiEntity('armor', armor)}/>
                    <div>{armor.type?.placement.map(p => t(`data.${p}`))}</div>
                    {armor.type?.armor}
                </ArmorItem>)}
            </ArmorSelectBox>

            <ArmorStatsBox>
                <ShieldStat>{armorStats.SHIELD || 0}</ShieldStat>
                <HeadStat>{armorStats.HEAD || 0}</HeadStat>
                <RightHandStat>{armorStats.HAND}</RightHandStat>
                <RightLegStat>{armorStats.LEG}</RightLegStat>
                <LeftHandStat>{armorStats.HAND}</LeftHandStat>
                <TorsoStat>{armorStats.TORSO}</TorsoStat>
                <LeftLegStat>{armorStats.LEG}</LeftLegStat>
            </ArmorStatsBox>

            <SkillFirstBox>

            </SkillFirstBox>
            <SkillSecondBox>
                <SelectItemBox value={'empty'} onChange={selectMultiEntity('skills', model.SKILL)}>
                    <option disabled hidden value={'empty'}/>
                    {toOptions(model.SKILL, entity.skills)}
                </SelectItemBox>
                {entity.skills.map(s =>
                    <SkillItem key={s.name}>
                        {s.name}
                        <RemoveIcon onClick={removeFromMultiEntity('skills', s)}/>
                    </SkillItem>)}
            </SkillSecondBox>
        </PersonColumn1>


        <PersonColumn2>

        </PersonColumn2>
    </PersonPane>
}

export default withModel(withGear(withPerson(PersonPage)));