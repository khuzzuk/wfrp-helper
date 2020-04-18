import {List} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React, {Component} from "react";
import {State} from "../../../state/State";
import {Collections} from "../../../util/Collections";
import SimpleEntitySelect from "./SimpleEntitySelect";

const fieldStyle = {
  container: {
    width: '100%'
  }, selectComponent: {
    width: '100%'
  }, itemsList: {
    height: '100%', width: '100%', overflow: 'auto',
  }, itemContainer: {
    display: 'flex', flexDirection: 'row'
  },
};

const selectStyle = {
  placeholder: () => ({
    color: 'transparent'
  }), singleValue: () => ({
    color: 'transparent'
  }),
};

class SelectableList extends Component {

  render() {
    const {
            classes,
            customStyle,
            listStyle,
            name,
            propName = name,
            value = State.data.entity[name],
            data = State.data[name],
            onGearAdd = selected => State.updateEntity(
                {[propName]: Collections.addEntityIfNew(selected, State.data.entity[propName])}),
            children,
            ...other
          } = this.props;

    const currentStyle = {...classes, ...customStyle};

    return <div style={{width: '100%'}} {...other}>
      <SimpleEntitySelect name={name}
                          options={data}
                          customStyle={{width: '100%'}}
                          onChange={onGearAdd}
                          value={null}/>
      <List style={{...{height: '100%', width: '100%', overflow: 'auto'}, ...listStyle}}>
        {children}
      </List>
    </div>;
  }
}

export default withStyles(fieldStyle)(SelectableList)