import React, {Component} from "react";
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";

class NationEditor extends Component {
    state = {
        entity: null
    };

    update = (updates) => {
        this.props.getEntity().updateWith(updates);
        this.setState({entity: this.state.entity});
    };

    apply = () => {
        this.props.onApply(this.state.entity)
    };

    render(): React.ReactNode {
        const {...other} = this.props;
        const entity = this.props.getEntity();

        return <Dialog {...other}>
            <DialogTitle>Nation editor</DialogTitle>
            <TextField key={'name'}
                       label={"Name"}
                       onChange={event => this.update({name: event.target.value})}
                       value={entity ? entity.name : ''}/>
            <TextField key={'description'}
                       label={"Description"}
                       onChange={event => this.update({description: event.target.value})}
                       value={entity ? entity.description : ''}
                       multiline/>
            <Button onClick={this.apply}>Apply</Button>
        </Dialog>;
    }
}

export default NationEditor;