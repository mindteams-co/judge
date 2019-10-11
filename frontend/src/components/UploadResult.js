import React from 'react';
import styled from 'styled-components';
import { Card, Form, Button, Upload, Icon, Row, Col } from 'antd';

const CardStyled = styled(Card)`
    margin-bottom: 15px;
    padding: 0px;
`;

const RowStyled = styled(Row)`
    display: flex;
    justify-content: flex-end;
`;

const ColStyled = styled(Col)`
    padding-left: 10px;
`;

const UploadResult = () => {
    return (
        <CardStyled>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <RowStyled>
                    <ColStyled>
                        <Form.Item>
                            <Upload name="CSV file" action="/upload.do" listType="file">
                                <Button>
                                    <Icon type="upload" />
                                    Click to upload CSV
                                </Button>
                            </Upload>
                        </Form.Item>
                    </ColStyled>
                    <ColStyled>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </ColStyled>
                </RowStyled>
            </Form>
        </CardStyled>
    );
};

export default UploadResult;
