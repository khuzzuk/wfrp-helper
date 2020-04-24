import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import {Cancel, Save} from "@material-ui/icons";
import {func} from "prop-types";
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {State} from "../state/State";
import {CreateFormField} from "./FormFieldGenerator";

const styles = theme => ({
    root: {
        width: '95%',
        margin: 'auto',
    }
});

class EntityEditor extends Component {
    render() {
        const {entityName, classes} = this.props;
        return <Grid container direction={"column"} className={classes.root}>
            {this.getFormFields()}
            <Grid item>
                <IconButton onClick={this.saveForm}><Save/></IconButton>
                <IconButton onClick={() => State.showTable(entityName)}><Cancel/></IconButton>
            </Grid>
        </Grid>
    }

    saveForm = () => {
        const {entity, entityName} = this.props;
        State.services[entityName].save(entity, () => State.showTable(entityName));
    };

    getFormFields = (): Component[] => {
        const {entityName, t} = this.props;
        return State.formFields[entityName]
            .map(field => CreateFormField(field, t))
            .map(component => <Grid key={component.key} item>{component}</Grid>);
    };

    updateEntity = (propName: string, toModel: func) => event => {
        const value = toModel ? toModel(event.target.value) : event.target.value;
        this.updateForm({[propName]: value})
    };
    updateForm = (updates) => {
        this.props.entity.updateWith(updates);
        this.setState({entity: this.props.entity});
    };
    updateState = state => {
        this.setState(state);
    }
}

export default withTranslation()(withStyles(styles)(EntityEditor));