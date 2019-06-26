// @flow
import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/es/TextField/TextField";
import SimpleEntitySelect from "../crud/field/SimpleEntitySelect";

const componentStyle = {
    container: {
        minWidth: 230,
        maxWidth: 230,
        minHeight: 100,
        maxHeight: 100,
        paddingLeft: 130,
        display: 'flex',
    },
    input: {
        fontFamily: 'wfrp',
        fontSize: '24px',
        textAlign: 'center',
    },
    socialLevel: {
        minWidth: 85,
        maxWidth: 85,
        minHeight: 50,
        maxHeight: 50,
        alignSelf: 'center',
    },
    religion: {
        minWidth: 140,
        maxWidth: 140,
        minHeight: 50,
        maxHeight: 50,
        paddingLeft: 10,
        alignSelf: 'flex-end',
    },
};

class ReligionSection extends Component {
    updateReligion = religion => {
        this.props.entity.religion = religion;
        this.setState({religion: religion});
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
                <TextField className={currentStyle.socialLevel} inputProps={{className: classes.input}}/>
                <SimpleEntitySelect className={currentStyle.religion}
                                    options={personService.religions}
                                    value={entity.religion}
                                    onChange={this.updateReligion}/>
            </div>
        );
    };
};

export default withStyles(componentStyle)(ReligionSection);