import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Form, Button, Upload, Icon, Row, Col } from 'antd';
import { authService } from '../services';

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
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const $user = authService.currentUser.subscribe(user => setCurrentUser(user));

        return () => $user.unsubscribe();
    }, []);

    return (
        <CardStyled>
            {currentUser ? (
                <Form
                    onSubmit={e => {
                        e.preventDefault();
                        console.log(e);
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
            ) : (
                <>
                    Please <Link to="/login">log in</Link> to submit a solution
                </>
            )}
        </CardStyled>
    );
};

export default UploadResult;
