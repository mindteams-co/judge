import React from 'react';
import { Container } from './style';
import { RegisterForm } from '../../components/RegisterForm';
import { authService, routingService } from '../../services';

const RegisterPage = () => {
    if (authService.currentUserValue()) {
        routingService.push('/');
    }

    return (
        <Container>
            <RegisterForm />
        </Container>
    );
};

export default RegisterPage;
