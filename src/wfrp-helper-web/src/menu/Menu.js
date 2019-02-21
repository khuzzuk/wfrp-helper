import React, { Component } from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

class Menu extends Component {
    render() {
        return(
            <div>
                <AppBar position={"static"}>
                    <Toolbar>
                        <Typography variant={'title'}>
                            Main Menu
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Menu