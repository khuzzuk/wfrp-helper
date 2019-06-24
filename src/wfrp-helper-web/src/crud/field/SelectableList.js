import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {List} from "@material-ui/core";
import SimpleEntitySelect from "./SimpleEntitySelect";

const fieldStyle = {
    container: {
        width: '100%'
    },
    selectComponent: {
        width: '100%'
    },
    itemsList: {
        height: '100%',
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

        return <div className={currentStyle.container} {...other}>
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