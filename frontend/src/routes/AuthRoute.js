import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authService } from '../services';

const AuthRoute = ({ path, component }) => {
    const user = authService.currentUserValue();

    const [isAdmin, setIsAdmin] = React.useState(false);

    const handleSetAdmin = async () => {
        const result = await authService.checkIfAdmin();
        setIsAdmin(result);
    };

    React.useEffect(() => {
        user && handleSetAdmin();
    }, []);

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user && isAdmin) {
        return <Redirect to="/" />;
    }
    return <Route exact path={path} component={component} />;
};

AuthRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired,
};

export default AuthRoute;
