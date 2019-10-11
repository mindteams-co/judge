import * as React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { authService, routingService } from '../services';
import { showNotification } from '../common/helpers/showNotification';
import { Input } from '../common/components/Input';
import { SubmitButton } from '../common/components/SubmitButton';

const FormWrapper = styled.div`
    width: 430px;
    padding: 32px 48px;
    border-radius: 4px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const LoginFormComponent = ({ form }) => {
    const alert = useAlert();

    const handleSubmit = event => {
        event.preventDefault();

        form.validateFields((err, { email, password }) => {
            if (!err) {
                authService
                    .login(email, password)
                    .then(user => {
                        routingService.push('/');
                        return user;
                    })
                    .catch(err => showNotification({ message: err.nonFieldErrors[0], alert }));
            }
        });
    };

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <Input id="email" form={form} placeholder="E-mail" />
                <Input id="password" type="password" form={form} placeholder="Password" />
                <SubmitButton value="Log in" />
                Or <Link to="/register"> register your team!</Link>
            </Form>
        </FormWrapper>
    );
};

LoginFormComponent.propTypes = {
    form: PropTypes.object.isRequired,
};

export const LoginForm = Form.create()(LoginFormComponent);
