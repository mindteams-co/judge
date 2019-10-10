import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthService } from '../services';

const AuthRoute = ({ path, component }) => {
    if (!AuthService.currentUserValue) {
        return <Redirect to="/login" />;
    }

    return <Route exact path={path} component={component} />;
};

AuthRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired,
};

export default AuthRoute;
