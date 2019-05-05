import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

export default class LookMenu extends MenuComponent {
    title = 'Look';

    getMenuItems = () => {
        const {
            onCharacter, characterService,
            onEyeColor, eyeColorService,
            onHairColor, hairColorService,
            onPhysicalFeature, physicalFeatureService} = this.props;

        return [
            <MenuItem key={'character'} onClick={this.showCrudAction(onCharacter, characterService)}>Character</MenuItem>,
            <MenuItem key={'eyeColor'} onClick={this.showCrudAction(onEyeColor, eyeColorService)}>Eye color</MenuItem>,
            <MenuItem key={'hairColor'} onClick={this.showCrudAction(onHairColor, hairColorService)}>Hair color</MenuItem>,
            <MenuItem key={'physicalFeature'} onClick={this.showCrudAction(onPhysicalFeature, physicalFeatureService)}>Physical Feature</MenuItem>,
        ];
    };
}