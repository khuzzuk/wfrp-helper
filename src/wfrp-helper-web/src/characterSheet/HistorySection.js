// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleEntitySelect from "../crud/field/SimpleEntitySelect";
import TextField from "@material-ui/core/es/TextField/TextField";

const componentStyle = {
    container: {
        width: '100%',
        height: 215,
        display: 'flex',
        flexFlow: 'column',
    },
    input: {
        fontFamily: 'wfrp',
        fontSize: '18px',
        textAlign: 'center',
    },
    familyInput: {
        fontFamily: 'wfrp',
        fontSize: '18px',
        textAlign: 'center',
        maxHeight: 70,
    },

    nation: {
        marginLeft: 190,
        marginTop: 60,
        minWidth: 160,
        maxWidth: 160,
        height: 50,
    },
    parents: {
        marginTop: 10,
        marginLeft: 240,
        minWidth: 110,
        maxWidth: 110,
        minHeight: 25,
        maxHeight: 25,
    },
    family: {
        marginTop: 10,
        marginLeft: 140,
        minWidth: 210,
        maxWidth: 210,
        minHeight: 80,
        maxHeight: 80,
    },
};

class HistorySection extends Component {
    updateProperty = prop => value => {
        this.props.entity[prop] = value;
        this.props.onChange(this.props.entity);
    };
    updatePropertyWithEvent = prop => event => {
        this.props.entity[prop] = event.target.value;
        this.setState({[prop]: event.target.value})
    };

    render() {
        const {
            customStyle, classes,
            entity, personService,
            ...other
        } = this.props;
        const currentStyle = {...classes, customStyle};

        return (
            <div {...other} className={currentStyle.container}>
                <SimpleEntitySelect className={currentStyle.nation}
                                    options={personService.nations}
                                    value={entity.nation}
                                    onChange={this.updateProperty('nation')}/>
                <TextField className={currentStyle.parents}
                           inputProps={{className: currentStyle.input}}
                           value={entity.parents}
                           onChange={this.updatePropertyWithEvent('parents')}/>
                <TextField className={currentStyle.family}
                           inputProps={{className: currentStyle.familyInput}}
                           value={entity.family}
                           onChange={this.updatePropertyWithEvent('family')}
                           multiline/>
            </div>
        );
    };
};

export default withStyles(componentStyle)(HistorySection);