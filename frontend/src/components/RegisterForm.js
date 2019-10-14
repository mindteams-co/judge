import * as React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from '../common/components/Input';
import { SubmitButton } from '../common/components/SubmitButton';
import { authService, routingService } from '../services';
import { showNotification } from '../common/helpers/showNotification';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

const FormWrapper = styled.div`
    width: 430px;
    padding: 32px 48px;
    border-radius: 4px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const RegisterFormComponent = ({ form }) => {
    const alert = useAlert();

    const handleSubmit = event => {
        event.preventDefault();

        form.validateFields((err, { teamName, email, password }) => {
            if (!err) {
                authService
                    .registerUser(teamName, email, password)
                    .then(user => {
                        showNotification({
                            message: 'Account has been created',
                            alert,
                            option: 'success',
                        });
                        routingService.push('/login');
                        return user;
                    })
                    .catch(() => {
                        showNotification({
                            message: 'Please ensure the data you have entered is correct',
                            alert,
                        });
                    });
            }
        });
    };

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <Input
                    id="teamName"
                    form={form}
                    placeholder="Team name"
                    message="Team name is required"
                />
                <Input id="email" form={form} placeholder="E-mail" />
                <Input id="password" type="password" form={form} placeholder="Password" />
                <SubmitButton value="Register" />
            </Form>
            Or <Link to="/"> go back to Home Page</Link>
        </FormWrapper>
    );
};

RegisterFormComponent.propTypes = {
    form: PropTypes.object.isRequired,
};

export const RegisterForm = Form.create()(RegisterFormComponent);
