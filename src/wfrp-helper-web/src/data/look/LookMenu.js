import React from "react";
import MenuComponent from "../../menu/MenuComponent";
import {MenuItem} from "@material-ui/core";

export default class LookMenu extends MenuComponent {
    title = 'Physical feature';

    getMenuItems = () => {
        const {onPhysicalFeature, physicalFeatureService} = this.props;

        return [
            <MenuItem key={'physicalFeature'} onClick={this.showCrudAction(onPhysicalFeature, physicalFeatureService)}>Physical Feature</MenuItem>
        ];
    };
}