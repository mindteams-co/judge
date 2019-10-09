import React from 'react';
import { routes } from './routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const Routes = () => (
    <Router>
        <Switch>
            {routes.map(route =>
                route.auth ? (
                    // <AuthRoute key={route.path} path={route.path} component={route.component} />
                    <></>
                ) : (
                    <Route exact key={route.path} path={route.path} component={route.component} />
                ),
            )}
        </Switch>
    </Router>
);
