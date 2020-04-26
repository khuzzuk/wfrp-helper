import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {State} from "../state/State";

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
    State.showTable('picture');
  };

  showScenarioView = () => {
    this.handleClose();
    State.updateScenario(null);
  };

  render() {
    const {t} = this.props;

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
        <MenuItem onClick={this.showPictureForm}>{t('picture')}</MenuItem>
        <MenuItem onClick={this.showScenarioView}>{t('scenario')}</MenuItem>
      </Menu>
    </div>;
  }
}

export default withTranslation()(ToolsMenu);