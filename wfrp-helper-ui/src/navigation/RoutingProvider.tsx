import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import {ConnectedRouter} from "connected-react-router";
import {history} from '../state/Store';
import TablePage from "../pages/TablePage";

export const HOME = '/';
export const LOGIN = '/login';
export const TABLE = '/table';

export default function RoutingProvider() {
  return <ConnectedRouter history={history}>
    <Switch>
      <Route path={HOME} exact component={HomePage}/>
      <Route path={LOGIN} exact component={LoginPage}/>
      <Route path={TABLE} exact component={TablePage}/>
      <Route><Redirect to={HOME}/></Route>
    </Switch>
  </ConnectedRouter>
}