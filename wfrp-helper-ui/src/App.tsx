import React from 'react';
import './App.css';
import {ThemeProvider} from 'styled-components';
import {MainTheme} from "./theme/MainTheme";
import RoutingProvider from "./navigation/RoutingProvider";
import {Provider} from "react-redux";
import './i18n';
import {Store} from "./state/Store";
import MainPane from './components/Pane/MainPane';

function App() {
  return (
      <Provider store={Store}>
        <ThemeProvider theme={MainTheme}>
            <MainPane>
                <div/>
                <RoutingProvider/>
            </MainPane>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
