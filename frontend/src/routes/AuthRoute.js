import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRoute = ({ path, component }) => {
    const isAuthenticated = false;
    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }
    return <Route exact path={path} component={component} />;
};

AuthRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
};

export default AuthRoute;
