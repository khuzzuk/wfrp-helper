import React, {Component}                 from 'react';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {grey, orange}                     from "@material-ui/core/colors";
import ContentPane                        from "./content/ContentPane";
import CharacterSheetForm                 from "./form/sheet/CharacterSheetForm";
import TopMenu                            from "./menu/TopMenu";
import Person                             from "./model/creature/Person";
import {State}                            from "./state/State";

const theme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: orange
    },
});

export default class App extends Component {

    constructor(props: P, context: any) {
        super(props, context);
        State.onUpdate = data => {
            this.setState({data: data})
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <TopMenu/>
                <ContentPane/>
            </MuiThemeProvider>
        );
    }
}
