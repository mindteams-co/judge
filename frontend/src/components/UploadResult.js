import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Form, Button, Upload, Icon, Row, Col } from 'antd';
import { authService } from '../services';
import { dummyUploadPhotoRequest } from '../common/dummyUploadPhotoRequest.js';
import { apiBase } from '../config/variables';
import decodeToken from '../common/decodeToken';

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

const UploadResult = ({ competitionId }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentFileList, setCurrentFileList] = useState([]);

    useEffect(() => {
        const $user = authService.currentUser.subscribe(user => setCurrentUser(user));

        return () => $user.unsubscribe();
    }, []);

    const handleOnChange = info => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);

        setCurrentFileList(fileList);
    };

    const handleOnSubmit = event => {
        event.preventDefault();

        console.log(event);

        if (currentFileList.length !== 1) return;

        const file = currentFileList[0];

        const url = `${apiBase}/competitions/${competitionId}/submissions/`;
        let formData = new FormData();

        const teamId = decodeToken(currentUser.token).user_id;

        formData.append('team', teamId);
        formData.append('file', file.originFileObj);

        const config = {
            method: 'POST',
            body: formData,
        };

        console.log(fetch(url, config));
    };

    return (
        <CardStyled>
            {currentUser ? (
                <Form onSubmit={handleOnSubmit}>
                    <RowStyled>
                        <ColStyled>
                            <Form.Item>
                                <Upload
                                    onChange={handleOnChange}
                                    name="CSV file"
                                    listType="file"
                                    customRequest={dummyUploadPhotoRequest}
                                    multiple={false}
                                    fileList={currentFileList}
                                    accept=".csv"
                                >
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
