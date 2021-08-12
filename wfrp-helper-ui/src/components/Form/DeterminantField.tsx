import {ChangeEvent, useState} from "react";
import {DeterminantButton, DeterminantColumn, DeterminantInput, DeterminantRow, FieldWrapper, Label} from "./styled";
import {Determinant} from "model/rule/Determinant";
import {useTranslation} from "react-i18next";
import {ModifierType} from "model/rule/ModifierType";
import {DeterminantType} from "model/rule/DeterminantType";
import {DeterminantService} from "utils/DeterminantService";
import {Dice} from "../../model/rule/Dice";

const allStats = [
    DeterminantType.SPEED,
    DeterminantType.BATTLE,
    DeterminantType.SHOOTING,
    DeterminantType.STRENGTH,
    DeterminantType.DURABILITY,
    DeterminantType.HEALTH,
    DeterminantType.INITIATIVE,
    DeterminantType.ATTACK,
    DeterminantType.DEXTERITY,
    DeterminantType.LEADER_SKILLS,
    DeterminantType.INTELLIGENCE,
    DeterminantType.CONTROL,
    DeterminantType.WILL,
    DeterminantType.CHARISMA,
    DeterminantType.PARRY,
    DeterminantType.OPPONENT_PARRY,
];

export class DeterminantFieldProps {
    determinants: Determinant[] = [];
    accept: (d: Determinant[]) => void = () => {};
    label: string = 'Stats';
}

export function DeterminantField(props: DeterminantFieldProps) {
    const [t] = useTranslation('base');
    const perType: Map<DeterminantType, Determinant> = new Map();
    const [determinants, setDeterminants] = useState(props.determinants);
    const [current, setCurrent] = useState<Determinant>();
    const [diceMod, setDiceMod] = useState(false);
    determinants.forEach(d => perType.set(d.type, d))

    if (determinants.length !== perType.size) {
        console.warn(`Determinants not mapped properly! Have ${determinants.length}, mapped: ${perType.size}`);
        window.alert(`Determinants not mapped properly! Have ${determinants.length}, mapped: ${perType.size}`);
    }

    const notifyNewDeterminant = (determinant: Determinant) => {
        const newDeterminants = [...DeterminantService.removeByType(determinants, determinant.type), determinant];
        setDeterminants(newDeterminants);
        props.accept(newDeterminants);
    }
    const onAddDeterminant = (type: DeterminantType) => () => {
        notifyNewDeterminant(DeterminantService.createDeterminant(type));
    }
    const onRemoveDeterminant = (type: DeterminantType) => () => {
        const newDeterminants = DeterminantService.removeByType(determinants, type);
        setDeterminants(newDeterminants);
        props.accept(newDeterminants);
    }
    const onValue = (det: Determinant) => (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);
        if (val || val === 0) {
            const newDeterminant = DeterminantService.clone(det);
            newDeterminant.value = val;
            notifyNewDeterminant(newDeterminant);
        }
    }
    const onAddModifier = (det: Determinant, modType: ModifierType) => () => {
        const newDeterminant = DeterminantService.clone(det);
        DeterminantService.addModifier(newDeterminant, modType);
        notifyNewDeterminant(newDeterminant);
    }
    const onModValue = (det: Determinant, modType: ModifierType) => (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);
        if (val || val === 0) {
            notifyNewDeterminant(DeterminantService.updateModifierValue(det, modType, val))
        }
    }
    const startAddDice = (det: Determinant) => () => {
        setCurrent(det);
        setDiceMod(true)
    }
    const onAddDice = (dice: Dice) => () => {
        if (!current) return;
        notifyNewDeterminant(DeterminantService.addDiceRoll(current, dice));
        setDiceMod(false);
    }
    const onRemoveDice = (det: Determinant, dice: Dice) => () => {
        notifyNewDeterminant(DeterminantService.removeDiceRoll(det, dice));
    }
    const onUpdateRolls = (det: Determinant, dice: Dice) => (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);
        if (val || val === 0) {
            notifyNewDeterminant(DeterminantService.updateRolls(det, dice, val));
        }
    }

    return <FieldWrapper>
        <Label>{props.label}</Label>
        <DeterminantRow>
            <DeterminantColumn>
                <Label>-</Label>
                <DeterminantButton>{t('props.base')}</DeterminantButton>
                <DeterminantButton>{t('rule.modifier.' + ModifierType.REGULAR)}</DeterminantButton>
                <DeterminantButton>{t('rule.modifier.' + ModifierType.PROFESSION)}</DeterminantButton>
                <DeterminantButton>{t('rule.modifier.' + ModifierType.EXPERIENCE)}</DeterminantButton>
                <DeterminantButton>{t('rule.modifier.' + ModifierType.DICE)}</DeterminantButton>
            </DeterminantColumn>
            {allStats.map(stat => {
                const det = perType.get(stat);
                if (!det) {
                    return <DeterminantColumn key={stat} onClick={onAddDeterminant(stat)}>
                        <DeterminantButton present={false}>{t('rule.short.' + stat)}</DeterminantButton>
                    </DeterminantColumn>
                }

                const regular = DeterminantService.findModifier(det, ModifierType.REGULAR);
                const profession = DeterminantService.findModifier(det, ModifierType.PROFESSION);
                const experience = DeterminantService.findModifier(det, ModifierType.EXPERIENCE);
                const dice = DeterminantService.findModifier(det, ModifierType.DICE);

                return <DeterminantColumn key={stat}>
                    <DeterminantButton present={true} onClick={onRemoveDeterminant(stat)}>
                        {t('rule.short.' + stat)}
                    </DeterminantButton>
                    <DeterminantInput value={det.value} onChange={onValue(det)}/>
                    {regular ?
                        <DeterminantInput value={regular.value} onChange={onModValue(det, ModifierType.REGULAR)}/> :
                        <DeterminantButton onClick={onAddModifier(det, ModifierType.REGULAR)}>+</DeterminantButton>}
                    {profession ?
                        <DeterminantInput value={profession.value} onChange={onModValue(det, ModifierType.PROFESSION)}/> :
                        <DeterminantButton onClick={onAddModifier(det, ModifierType.PROFESSION)}>+</DeterminantButton>}
                    {experience ?
                        <DeterminantInput value={experience.value} onChange={onModValue(det, ModifierType.EXPERIENCE)}/> :
                        <DeterminantButton onClick={onAddModifier(det, ModifierType.EXPERIENCE)}>+</DeterminantButton>}
                    {dice ?
                        [<DeterminantInput key={'baseValue'} value={dice.value} onChange={onModValue(det, ModifierType.DICE)}/>,
                        ...dice.rolls.map(roll =>
                                [<DeterminantButton onClick={onRemoveDice(det, roll.dice)}>{roll.dice}</DeterminantButton>,
                                <DeterminantInput value={roll.rolls} onChange={onUpdateRolls(det, roll.dice)}/>]
                            ),
                            <DeterminantButton onClick={startAddDice(det)}>+</DeterminantButton>
                        ] :
                        <DeterminantButton onClick={onAddModifier(det, ModifierType.DICE)}>+</DeterminantButton>}
                </DeterminantColumn>
            })}
            {diceMod && <DeterminantColumn>
                {Object.values(Dice).map(dice =>
                    <DeterminantButton key={dice} onClick={onAddDice(dice)}>{dice}</DeterminantButton>)}
                <DeterminantButton onClick={() => setDiceMod(false)}>-</DeterminantButton>
            </DeterminantColumn>}
        </DeterminantRow>
    </FieldWrapper>
}