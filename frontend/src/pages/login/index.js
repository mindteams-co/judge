import React from 'react';
import { Container } from './style';
import { LoginForm } from '../../components/LoginForm';
import { authService, routingService } from '../../services';

const LoginPage = () => {
    if (authService.currentUserValue()) {
        routingService.push('/');
    }

    return (
        <Container>
            <LoginForm />
        </Container>
    );
};

export default LoginPage;
