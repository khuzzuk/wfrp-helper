import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import CircularProgress from "@material-ui/core/CircularProgress";
import DataLoader from "./state/DataLoader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import './i18n';

const App = React.lazy(() => {
    DataLoader.refreshData();
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
    <Suspense fallback={loadingPage}>
        <App/>
    </Suspense>,
    document.getElementById('root'));

serviceWorker.unregister();
