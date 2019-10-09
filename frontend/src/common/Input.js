import React from 'react';
import { Form, Input as AntdInput } from 'antd';
import PropTypes from 'prop-types';

export const Input = ({
    placeholder,
    label,
    type = 'string',
    required = true,
    disabled = false,
    ...props
}) => {
    return (
        <Form.Item>
            {props.form.getFieldDecorator(props.id, {
                initialValue: props.initialValue,
                rules: [{ required, message: props.message }],
            })(
                <AntdInput
                    type={type}
                    placeholder={placeholder || label}
                    disabled={disabled}
                    addonAfter={props.addonAfter}
                />,
            )}
        </Form.Item>
    );
};

Input.propTypes = {
    form: PropTypes.any,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    message: PropTypes.string,
    initialValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    addonAfter: PropTypes.node,
};
