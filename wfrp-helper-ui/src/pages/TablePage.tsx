import {useTranslation} from "react-i18next";
import withModel from "state/model/modelSelector";
import ModelConfig, {FieldDef, ModelType} from "model/ModelConfig";
import {Table, TableBody, TableCell, TableHead, TableRow} from "components/Table/styled";
import {useState} from "react";
import {FieldType} from "entity/FieldType";
import {BaseEntity} from "../model/BaseEntity";

interface HomePageProps {
    model: { [key in ModelType]: any[] };
    table?: ModelType;
}

function HomePage(props: HomePageProps) {
    const [selectedEntity, setSelectedEntity] = useState<any>();
    let cols = props.table && ModelConfig[props.table].table.length || 0;

    const toCell = (entity: any & BaseEntity, fieldDef: FieldDef) => {
        const key = entity.id + '_' + fieldDef.prop;

        switch (fieldDef.type) {
            case FieldType.TEXT:
                return <TableCell key={key}>{entity[fieldDef.prop]}</TableCell>
            case FieldType.BOOLEAN:
                return <TableCell key={key}><input type={'checkbox'} value={entity[fieldDef.prop]}
                                                   disabled={true}/></TableCell>
        }
    }

    const onSelectedEntity = (entity: any) => () => {
        if (selectedEntity === entity) {
            setSelectedEntity(undefined);
            return;
        }

        setSelectedEntity(entity);
    }

    return <Table>
        <TableHead cols={cols}>
            {props.table && ModelConfig[props.table].table.map(fieldDef => <TableCell key={fieldDef.prop}>
                {fieldDef.prop}
            </TableCell>)}
        </TableHead>
        <TableBody>
            {props.table && props.model[props.table].map(entity =>
                <TableRow key={entity.id}
                          cols={cols}
                          selected={selectedEntity === entity}
                          onClick={onSelectedEntity(entity)}>
                    {props.table && ModelConfig[props.table].table.map(fieldDef => toCell(entity, fieldDef))}
                </TableRow>)}
        </TableBody>
    </Table>
}

export default withModel(HomePage);