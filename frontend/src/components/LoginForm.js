import * as React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import { Input } from '../common/Input';
import { SubmitButton } from '../common/SubmitButton';

const FormWrapper = styled.div`
    width: 430px;
    padding: 32px 48px;
    border-radius: 4px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const LoginFormComponent = ({ form, ...props }) => {
    const handleSubmit = event => {
        event.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <Input id="email" form={form} placeholder="E-mail" />
                <Input id="password" type="password" form={form} placeholder="Password" />
                <SubmitButton value="Log in" />
                Or <a href="">register you team!</a>
            </Form>
        </FormWrapper>
    );
};

export const LoginForm = Form.create()(LoginFormComponent);
