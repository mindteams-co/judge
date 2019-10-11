import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import { useAlert } from 'react-alert';
import { competitionService } from '../services';
import decodeToken from '../common/decodeToken';
import UploadSubmission from './UploadSubmission';
import { showNotification } from '../common/helpers/showNotification';

const RowStyled = styled(Row)`
    display: flex;
    justify-content: flex-end;
`;

const ColStyled = styled(Col)`
    padding-left: 10px;
`;

const UploadSubmissionForm = ({ competitionId, user }) => {
    const alert = useAlert();

    const [currentFileList, setCurrentFileList] = useState([]);

    const handleOnSubmit = event => {
        event.preventDefault();

        if (currentFileList.length !== 1) return;

        const file = currentFileList[0];
        const teamId = decodeToken(user.token).user_id;

        const data = {
            team: teamId,
            file: file.originFileObj,
        };
        competitionService.postCompetitionSubmission(competitionId, data);

        showNotification({
            message: 'A solution has been successfully submitted. You can check "my submissions" page.',
            alert,
        });
        setCurrentFileList([]);
    };

    return (
        <Form onSubmit={handleOnSubmit}>
            <RowStyled>
                <ColStyled>
                    <Form.Item>
                        <UploadSubmission
                            setCurrentFileList={setCurrentFileList}
                            currentFileList={currentFileList}
                        />
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
    );
};

UploadSubmissionForm.propTypes = {
    competitionId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
};

export default UploadSubmissionForm;
