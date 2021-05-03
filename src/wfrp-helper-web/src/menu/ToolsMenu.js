import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import Picture from "../img/Picture";
import {State} from "../state/State";
import AuthoritiesService from "../user/AuthoritiesService";
import User from "../user/User";
import DataLoader from "../state/DataLoader";

class ToolsMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleClose = () => {
    this.setState({anchorEl: null})
  };

  showPictureForm = () => {
    this.handleClose();
    State.showTable(Picture.entityName);
  };

  showScenarioView = () => {
    this.handleClose();
    State.updateScenario(null);
  };

  showUsersTable = () => {
    this.handleClose();
    DataLoader.refreshForEntity(User.entityName);
    State.showTable(User.entityName);
  };

  render() {
    const {t}     = this.props;
    const isAdmin = AuthoritiesService.hasAuthority('admin');

    return <div>
      <IconButton aria-label={'More'}
                  aria-owns={this.state.anchorEl !== null ? 'app-tools-menu' : undefined}
                  aria-haspopup={'true'}
                  onClick={this.handleClick}>
        <MoreVertIcon/>
      </IconButton>

      <Menu id={'app-tools-menu'}
            anchorEl={this.state.anchorEl}
            open={this.state.anchorEl !== null}
            onClose={this.handleClose}>
        {isAdmin && <MenuItem onClick={this.showUsersTable}>{t('user')}</MenuItem>}
        <MenuItem onClick={this.showPictureForm}>{t('picture')}</MenuItem>
        <MenuItem onClick={this.showScenarioView}>{t('scenario')}</MenuItem>
      </Menu>
    </div>;
  }
}

export default withTranslation()(ToolsMenu);