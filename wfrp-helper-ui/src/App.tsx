import React from 'react';
import './App.css';
import {ThemeProvider} from 'styled-components';
import {MainTheme} from "./theme/MainTheme";
import RoutingProvider from "./navigation/RoutingProvider";
import {Provider} from "react-redux";
import './i18n';
import {Store} from "./state/Store";

function App() {
  return (
      <Provider store={Store}>
        <ThemeProvider theme={MainTheme}>
          <RoutingProvider/>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
