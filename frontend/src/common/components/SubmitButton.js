import * as React from 'react';
import { Button, Form } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled(Form.Item)`
    width: 100%;
`;

export const SubmitButton = ({ value, ...props }) => (
    <Container>
        <Button type="primary" htmlType="submit" {...props}>
            {value}
        </Button>
    </Container>
);

SubmitButton.propTypes = {
    value: PropTypes.string.isRequired,
};
