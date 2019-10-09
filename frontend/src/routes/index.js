import React from 'react';
import { routes } from './routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import { history } from '../config/history';

export const Routes = () => (
    <Router history={history}>
        <Switch>
            {routes.map(route =>
                route.auth ? (
                    <AuthRoute key={route.path} path={route.path} component={route.component} />
                ) : (
                    <Route exact key={route.path} path={route.path} component={route.component} />
                ),
            )}
        </Switch>
    </Router>
);
