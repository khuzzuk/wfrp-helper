import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {List} from "@material-ui/core";
import SimpleEntitySelect from "./SimpleEntitySelect";

const fieldStyle = {
    selectComponent: {
        width: '100%'
    },
    itemsList: {
        height: 150,
        maxHeight: 150,
        paddingLeft: 10,
        paddingTop: 0,
        width: '100%',
        overflow: 'auto',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
};

const selectStyle = {
    placeholder: () => ({
        color: 'transparent'
    }),
    singleValue: () => ({
        color: 'transparent'
    }),
};

class SelectableList extends Component {

    render() {
        const {
            classes, value, data,
            customStyle,
            onGearAdd,
            children, ...other
        } = this.props;

        const currentStyle = {...classes, ...customStyle};

        return <div className={currentStyle.gearField} {...other}>
            <SimpleEntitySelect className={currentStyle.selectComponent} customStyle={selectStyle} options={data}
                                onChange={onGearAdd}/>
            <List className={currentStyle.itemsList}>
                {
                    children
                }
            </List>
        </div>;
    }
}

export default withStyles(fieldStyle)(SelectableList)