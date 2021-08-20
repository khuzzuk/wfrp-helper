import {ModelType} from "model/ModelConfig";
import withModel from "state/model/modelSelector";
import {useTranslation} from "react-i18next";
import {
    Dropdown,
    DropdownButton,
    DropdownSearch,
    FieldWrapper,
    ListElement,
    SelectableList,
    SelectedElement,
    SelectedElements
} from "./styled";
import {Label} from "./TextArea";
import {MdClose, MdExpandMore} from "react-icons/md";
import React, {useState} from "react";
import {BaseEntity} from "model/BaseEntity";

export interface ComboBoxProps {
    value?: BaseEntity;
    values?: BaseEntity[];
    multi?: boolean;
    enum?: boolean;
    label: string;
    linked?: ModelType;
    data?: any[];
    translate?: boolean;
    options?: (a: any) => string;
    accept: (v: any[] | any) => void;
    model: { [key in ModelType]: any[] };
}

function ComboBox(props: ComboBoxProps) {
    const [t] = useTranslation('base');
    const [showList, setShowList] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

    const label = t('props.' + props.label);
    const compareId = props.enum ? (v1: any, v2: any) => v1 === v2 : (v1: any, v2: any) => (v1 && v2) && v1.id === v2.id;
    const compareSearch = props.enum ?
        (o: any) => o.toLowerCase().startsWith(search.toLowerCase()) :
        (o: any) => o.name.toLowerCase().startsWith(search.toLowerCase());
    const options = (props.linked ? props.model[props.linked] : props.data || [])
        .map(o => props.options ? props.options(o) : o)
        .filter(o => props.multi ? !(props.values?.find(v => compareId(o, v))) : !(compareId(props.value, o)))
        .filter(o => !search || compareSearch(o));

    const cancelSelection = () => {
        setSearch('');
        setShowList(false);
        setActiveIndex(-1);
    }

    const confirm = (option: any) => {
        if (props.multi) {
            props.values ? props.accept([...props.values, option]) : props.accept([option]);
        } else {
            props.accept(option);
        }
        cancelSelection();
    }

    const remove = (option: any) => {
        if (props.multi) {
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
                    <SelectedElement key={v.name || v} onClick={() => remove(v)}>{v.name ? v.name : props.translate ? t('data.' + v) : v}<MdClose/></SelectedElement>)}
                {props.value &&
                    <SelectedElement key={(props.value as any).name || props.value} onClick={() => remove(props.value)}>
                        {(props.value as any).name ? (props.value as any).name : props.translate ? t('data.' + props.value) : props.value}<MdClose/>
                    </SelectedElement>}
                <DropdownSearch onChange={e => setSearch(e.target.value)}
                                value={search}
                                placeholder={t('common.search')}/>
            </SelectedElements>
            <DropdownButton onClick={() => !showList ? setShowList(true) : cancelSelection()}>
                <MdExpandMore/>
            </DropdownButton>

            {(showList || search) && <SelectableList>
                {options.map((o, i) => <ListElement key={o.name || o} active={i === activeIndex}
                                                    onClick={() => confirm(o)}>{o.name ? o.name : props.translate ? t('data.' + o) : o}</ListElement>)}
            </SelectableList>}
        </Dropdown>
    </FieldWrapper>
}

export default withModel(ComboBox);