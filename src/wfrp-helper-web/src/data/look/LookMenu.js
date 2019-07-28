import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";
import {store} from "../../state";

export default class LookMenu extends MenuComponent {
    title = 'Look';

    getMenuItems = () => {
        const {onCrud} = this.props;

        return [
            <MenuItem key={'character'} onClick={this.showCrudAction(onCrud, store.characterService)}>Character</MenuItem>,
            <MenuItem key={'eyeColor'} onClick={this.showCrudAction(onCrud, store.eyeColorService)}>Eye color</MenuItem>,
            <MenuItem key={'hairColor'} onClick={this.showCrudAction(onCrud, store.hairColorService)}>Hair color</MenuItem>,
            <MenuItem key={'physicalFeature'} onClick={this.showCrudAction(onCrud, store.physicalFeatureService)}>Physical Feature</MenuItem>,
        ];
    };
}