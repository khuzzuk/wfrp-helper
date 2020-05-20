import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

const App = React.lazy(() => {
    return import('./App');
});

const loadingPage = <Grid container>
    <Grid item xs={12}>
        <Grid container justify={"center"} alignItems={"center"} direction={"column"}>
            <Grid item xs={3}>
                <Typography>WFRP Helper</Typography>
            </Grid>
            <Grid item xs={3}>
                <CircularProgress/>
            </Grid>
        </Grid>
    </Grid>
</Grid>;

ReactDOM.render(
    <BrowserRouter>
        <Suspense fallback={loadingPage}>
            <App/>
        </Suspense>
    </BrowserRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
