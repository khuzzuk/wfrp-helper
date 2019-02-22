import React, {Component} from 'react';
import {
    AppBar,
    Button,
    MenuItem,
    MenuList,
    Paper,
    Toolbar,
    Typography,
    ClickAwayListener,
    Popper, Grow
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    Toolbar: {
        background: 'rgb(200, 200, 200)'
    }
};

class AppMenu extends Component {
    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState({open: !this.state.open})
    };

    handleClose = event => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({open: false});
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar position={"relative"} className={classes.Toolbar}>
                    <Toolbar>
                        <Typography variant={'title'}>
                            WFRP Helper
                        </Typography>
                        <Button buttonRef={i => this.anchorEl = i}
                                onClick={this.handleToggle}>World</Button>
                        <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
                            {
                                ({TransitionProps, placement}) => (
                                    <Grow {...TransitionProps} id={"menu-list-grow"} style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList>
                                                    <MenuItem onClick={this.handleClose}>Nations</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )
                            }
                        </Popper>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(AppMenu);