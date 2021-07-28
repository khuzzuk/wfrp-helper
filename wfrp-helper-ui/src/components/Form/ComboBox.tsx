import {FieldDef, ModelType} from "model/ModelConfig";
import withModel from "state/model/modelSelector";
import {FieldType} from "../../entity/FieldType";
import {useTranslation} from "react-i18next";
import {
    Dropdown, DropdownButton, DropdownSearch, FieldWrapper,
    ListElement, SelectableList, SelectedElement, SelectedElements
} from "./styled";
import {Label} from "./TextArea";
import {MdClose, MdExpandMore} from "react-icons/md";
import React, {useState} from "react";
import {BaseEntity} from "../../model/BaseEntity";

export interface ComboBoxProps {
    value?: BaseEntity;
    values?: BaseEntity[];
    def: FieldDef;
    form?: ModelType;
    entity?: any;
    accept: (v: any[] | any) => void;
    model: { [key in ModelType]: any[] };
}

function ComboBox(props: ComboBoxProps) {
    const [t] = useTranslation('base');
    const [showList, setShowList] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

    if (!props.form || !props.def.linked) {
        return <div/>;
    }

    const isMulti = props.def.type === FieldType.ENTITY_MULTISELECT;
    const label = t('props.' + props.def.prop);
    const options = props.model[props.def.linked]
        .filter(o => isMulti ? !(props.values?.find(v => v.id === o.id)) : !(props.value?.id === o.id))
        .filter(o => !search || o.name.toLowerCase().startsWith(search.toLowerCase()));

    const cancelSelection = () => {
        setSearch('');
        setShowList(false);
        setActiveIndex(-1);
    }

    const confirm = (option: any) => {
        if (isMulti) {
            props.values ? props.accept([...props.values, option]) : props.accept([option]);
        } else {
            props.accept(option);
        }
        cancelSelection();
    }

    const remove = (option: any) => {
        if (isMulti) {
            const toRemoveIndex = props.values?.indexOf(option);
            if (toRemoveIndex !== undefined && toRemoveIndex >= 0) {
                const newArray = [...props.values || []];
                newArray.splice(toRemoveIndex, 1);
                props.accept(newArray);
            }
        } else {
            props.accept(undefined);
        }
    }

    const onArrow = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            if (options.length > activeIndex) {
                setActiveIndex(activeIndex + 1);
            }
        } else if (e.key === 'ArrowUp') {
            if (activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
            }
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0) {
                confirm(options[activeIndex]);
            }
            cancelSelection()
        }
    }

    return <FieldWrapper>
        {label && <Label>{label}</Label>}
        <Dropdown onKeyDown={onArrow} tabIndex={0}>
            <SelectedElements>
                {props.values && props.values.map((v: any) =>
                    <SelectedElement key={v.name} onClick={() => remove(v)}>{v.name}<MdClose/></SelectedElement>)}
                {props.value &&
                    <SelectedElement key={(props.value as any).name} onClick={() => remove(props.value)}>
                        {(props.value as any).name}<MdClose/>
                    </SelectedElement>}
                <DropdownSearch onChange={e => setSearch(e.target.value)}
                                value={search}
                                placeholder={t('common.search')}/>
            </SelectedElements>
            <DropdownButton onClick={() => !showList ? setShowList(true) : cancelSelection()}>
                <MdExpandMore/>
            </DropdownButton>

            {(showList || search) && <SelectableList>
                {options.map((o, i) => <ListElement active={i === activeIndex}
                                                    onClick={() => confirm(o)}>{o.name}</ListElement>)}
            </SelectableList>}
        </Dropdown>
    </FieldWrapper>
}

export default withModel(ComboBox);