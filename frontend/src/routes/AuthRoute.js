import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authService } from '../services';

const AuthRoute = ({ path, component }) =>
    !authService.currentUserValue() ? (
        <Redirect to="/login" />
    ) : (
        <Route exact path={path} component={component} />
    );

AuthRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired,
};

export default AuthRoute;
